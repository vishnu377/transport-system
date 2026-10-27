/**
 * upload_all_parties_to_firestore.js
 * Uploads all 3,396 authentic parties directly to Firebase Cloud Firestore collection 'parties'
 * Uses Firestore REST API commit endpoint in batches of 400 documents.
 */

const https = require('https');
const allParties = require('../js/sample-parties-data.js');

const apiKey = 'AIzaSyBsCMRij9cg3Qm_VD7UXONQ9z80AuHLImE';
const commitUrl = 'https://firestore.googleapis.com/v1/projects/mtc-ttc-logistics/databases/(default)/documents:commit?key=' + apiKey;

console.log(`=== Starting Upload of ${allParties.length} Parties to Firebase Firestore ===\n`);

function commitBatch(batchParties, batchNum, totalBatches) {
  return new Promise((resolve, reject) => {
    const writes = batchParties.map(p => ({
      update: {
        name: `projects/mtc-ttc-logistics/databases/(default)/documents/parties/${p.id}`,
        fields: {
          id: { stringValue: String(p.id) },
          sno: { integerValue: Number(p.sno || 0) },
          name: { stringValue: String(p.name || '') },
          gstin: { stringValue: String(p.gstin || '') },
          address: { stringValue: String(p.address || '') },
          mobile: { stringValue: String(p.mobile || '') },
          mobile1: { stringValue: String(p.mobile1 || '') },
          city: { stringValue: String(p.city || '') },
          state: { stringValue: String(p.state || '') },
          contactPerson: { stringValue: String(p.contactPerson || '') },
          dueAmount: { doubleValue: Number(p.dueAmount || 0) },
          paidAmount: { doubleValue: Number(p.paidAmount || 0) }
        }
      }
    }));

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
          console.log(`[Batch ${batchNum}/${totalBatches}] Successfully committed ${count} parties to Firestore.`);
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
  const BATCH_SIZE = 400;
  const totalBatches = Math.ceil(allParties.length / BATCH_SIZE);
  let totalUploaded = 0;

  for (let i = 0; i < allParties.length; i += BATCH_SIZE) {
    const batchParties = allParties.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const count = await commitBatch(batchParties, batchNum, totalBatches);
    totalUploaded += count;
    // Small delay between batches to respect rate limits
    await new Promise(r => setTimeout(r, 400));
  }

  console.log(`\n======================================================`);
  console.log(`>>> SUCCESS: Uploaded ALL ${totalUploaded} Parties to Firestore! <<<`);
  console.log(`======================================================\n`);
}

uploadAll().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
