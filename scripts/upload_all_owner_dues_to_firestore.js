/**
 * upload_all_owner_dues_to_firestore.js
 * Uploads all authentic owner dues directly to Firebase Cloud Firestore collection 'ownerDues'
 * Uses Firestore REST API commit endpoint in batches.
 */

const https = require('https');
const allDues = require('../js/sample-owner-dues-data.js');

const apiKey = 'AIzaSyBsCMRij9cg3Qm_VD7UXONQ9z80AuHLImE';
const commitUrl = 'https://firestore.googleapis.com/v1/projects/mtc-ttc-logistics/databases/(default)/documents:commit?key=' + apiKey;

console.log(`=== Starting Upload of ${allDues.length} Owner Dues to Firebase Firestore ===\n`);

function commitBatch(batchDues, batchNum, totalBatches) {
  return new Promise((resolve, reject) => {
    const writes = batchDues.map(d => ({
      update: {
        name: `projects/mtc-ttc-logistics/databases/(default)/documents/ownerDues/${d.id}`,
        fields: {
          id: { stringValue: String(d.id) },
          grNo: { stringValue: String(d.grNo || '') },
          tripDate: { stringValue: String(d.tripDate || '') },
          tripEndDate: { stringValue: String(d.tripEndDate || '') },
          year: { stringValue: String(d.year || '2026-2027') },
          status: { stringValue: String(d.status || 'Transit') },
          color: { stringValue: String(d.color || 'yellow') },
          colorHex: { stringValue: String(d.colorHex || '#e5a823') },
          dueAmount: { doubleValue: Number(d.dueAmount || 0) },
          paidAmount: { doubleValue: Number(d.paidAmount || 0) },
          truckNo: { stringValue: String(d.truckNo || '') },
          ownerName: { stringValue: String(d.ownerName || '') },
          ownerMobile: { stringValue: String(d.ownerMobile || '') },
          origin: { stringValue: String(d.origin || '') },
          destination: { stringValue: String(d.destination || '') },
          transport: { stringValue: String(d.transport || 'TTC') },
          material: { stringValue: String(d.material || '') },
          weight: { doubleValue: Number(d.weight || 0) },
          rate: { doubleValue: Number(d.rate || 0) },
          billingType: { stringValue: String(d.billingType || 'Per Tonne') },
          biltyAmount: { doubleValue: Number(d.biltyAmount || 0) },
          reference: { stringValue: String(d.reference || '') },
          referenceMobile: { stringValue: String(d.referenceMobile || '') },
          driver: { stringValue: String(d.driver || '') },
          consignorName: { stringValue: String((d.consignor && d.consignor.name) || '') },
          consigneeName: { stringValue: String((d.consignee && d.consignee.name) || '') }
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
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`[Batch ${batchNum}/${totalBatches}] Successfully committed ${batchDues.length} owner dues to Firestore.`);
          resolve();
        } else {
          console.error(`[Batch ${batchNum}/${totalBatches}] Error: HTTP ${res.statusCode}:`, data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(postData);
    req.end();
  });
}

async function run() {
  const batchSize = 250;
  const totalBatches = Math.ceil(allDues.length / batchSize);

  for (let i = 0; i < totalBatches; i++) {
    const chunk = allDues.slice(i * batchSize, (i + 1) * batchSize);
    await commitBatch(chunk, i + 1, totalBatches);
  }

  console.log(`\n=== Upload Completed! Committed ${allDues.length} / ${allDues.length} Owner Dues to Firestore ===`);
}

run().catch(err => {
  console.error("Fatal upload error:", err.message);
  process.exit(1);
});
