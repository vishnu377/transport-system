/**
 * upload_all_truck_owners_to_firestore.js
 * Uploads all 595 authentic truck owners directly to Firebase Cloud Firestore collection 'truckOwners'
 * Uses Firestore REST API commit endpoint in batches.
 */

const https = require('https');
const allOwners = require('../js/sample-truck-owners-data.js');

const apiKey = 'AIzaSyBsCMRij9cg3Qm_VD7UXONQ9z80AuHLImE';
const commitUrl = 'https://firestore.googleapis.com/v1/projects/mtc-ttc-logistics/databases/(default)/documents:commit?key=' + apiKey;

console.log(`=== Starting Upload of ${allOwners.length} Truck Owners to Firebase Firestore ===\n`);

function commitBatch(batchOwners, batchNum, totalBatches) {
  return new Promise((resolve, reject) => {
    const writes = batchOwners.map(o => ({
      update: {
        name: `projects/mtc-ttc-logistics/databases/(default)/documents/truckOwners/${o.id}`,
        fields: {
          id: { stringValue: String(o.id) },
          truckNo: { stringValue: String(o.truckNo || '') },
          name: { stringValue: String(o.name || '') },
          mobile: { stringValue: String(o.mobile || '') },
          mobile1: { stringValue: String(o.mobile1 || '') },
          type: { stringValue: String(o.type || 'Market') },
          dueAmount: { doubleValue: Number(o.dueAmount || 0) },
          paidAmount: { doubleValue: Number(o.paidAmount || 0) },
          totalTrips: { integerValue: Number(o.totalTrips || 0) }
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
          console.log(`[Batch ${batchNum}/${totalBatches}] Successfully committed ${count} truck owners to Firestore.`);
          resolve(count);
        } else {
          console.error(`[Batch ${batchNum}/${totalBatches}] Error (${res.statusCode}):`, data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[Batch ${batchNum}/${totalBatches}] Network Error:`, err.message);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function uploadAll() {
  const BATCH_SIZE = 300;
  const totalBatches = Math.ceil(allOwners.length / BATCH_SIZE);
  let totalCommitted = 0;

  for (let i = 0; i < totalBatches; i++) {
    const chunk = allOwners.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    try {
      const count = await commitBatch(chunk, i + 1, totalBatches);
      totalCommitted += count;
      // Small pause between batches
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.error(`Failed at batch ${i + 1}:`, e.message);
    }
  }

  console.log(`\n=== Upload Completed! Committed ${totalCommitted} / ${allOwners.length} Truck Owners to Firestore ===`);
}

uploadAll();
