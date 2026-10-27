/**
 * upload_all_party_due_to_firestore.js
 * Uploads all 413 authentic enriched party due trips directly to Firebase Cloud Firestore collection 'party_due'
 * Uses Firestore REST API commit endpoint in batches.
 */

const https = require('https');
const allPartyDue = require('../js/party-due-data.js');

const apiKey = 'AIzaSyBsCMRij9cg3Qm_VD7UXONQ9z80AuHLImE';
const commitUrl = 'https://firestore.googleapis.com/v1/projects/mtc-ttc-logistics/databases/(default)/documents:commit?key=' + apiKey;

console.log(`=== Starting Upload of ${allPartyDue.length} Party Due Trips to Firebase Firestore ===\n`);

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (typeof val === 'boolean') return { booleanValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function commitBatch(batchTrips, batchNum, totalBatches) {
  return new Promise((resolve, reject) => {
    const writes = batchTrips.map(t => {
      const docId = t.id || `DUE_${t.grNo.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const fields = {};
      for (const [k, v] of Object.entries(t)) {
        fields[k] = toFirestoreValue(v);
      }
      return {
        update: {
          name: `projects/mtc-ttc-logistics/databases/(default)/documents/party_due/${docId}`,
          fields
        }
      };
    });

    const postData = JSON.stringify({ writes });

    const req = https.request(commitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const json = JSON.parse(data);
          const count = json.writeResults ? json.writeResults.length : 0;
          console.log(`[Batch ${batchNum}/${totalBatches}] Successfully committed ${count} trips to Firestore.`);
          resolve(count);
        } else {
          console.error(`[Batch ${batchNum}/${totalBatches}] Error (${res.statusCode}):`, data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(postData);
    req.end();
  });
}

async function uploadAll() {
  const BATCH_SIZE = 150;
  const totalBatches = Math.ceil(allPartyDue.length / BATCH_SIZE);
  let totalUploaded = 0;

  for (let i = 0; i < allPartyDue.length; i += BATCH_SIZE) {
    const batchTrips = allPartyDue.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const count = await commitBatch(batchTrips, batchNum, totalBatches);
    totalUploaded += count;
    await new Promise(r => setTimeout(r, 400));
  }

  console.log(`\n======================================================`);
  console.log(`>>> SUCCESS: Uploaded ALL ${totalUploaded} Party Due Trips to Firestore! <<<`);
  console.log(`======================================================\n`);
}

uploadAll().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
