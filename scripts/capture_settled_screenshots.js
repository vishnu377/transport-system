const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\ac3217be-821d-40b2-8aca-faf03e763b04';
const projectRoot = path.join(__dirname, '..');

// Simple static file server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(projectRoot, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(8089, () => {
  console.log('Static server listening on http://localhost:8089');

  try {
    // 1. Capture Settled Register Table
    console.log('Capturing Settled Register Table...');
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=7000',
      '--window-size=1500,1000',
      `--screenshot=${path.join(brainDir, 'settled_table_view.png')}`,
      'http://localhost:8089/pages/trips.html?view=settled'
    ]);
    console.log('✓ settled_table_view.png captured');

    // 2. Capture Settled Trip Details (3 Cards Left + 3 Cards Right)
    console.log('Capturing Settled Trip Details View...');
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=7000',
      '--window-size=1500,1100',
      `--screenshot=${path.join(brainDir, 'settled_trip_details_view.png')}`,
      'http://localhost:8089/pages/trips.html?view=settled&openModal=settledDetails'
    ]);
    console.log('✓ settled_trip_details_view.png captured');

    // 3. Capture Settled Trip Details Card 3 & Right Pane focus
    console.log('Capturing Settled Trip Details Lower Cards...');
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=7000',
      '--window-size=1500,1100',
      `--screenshot=${path.join(brainDir, 'settled_trip_details_lower.png')}`,
      'http://localhost:8089/pages/trips.html?view=settled&openModal=settledDetails&scroll=card3'
    ]);
    console.log('✓ settled_trip_details_lower.png captured');

    // 4. Capture Settled Party Details View
    console.log('Capturing Settled Trip Party Details View...');
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=7000',
      '--window-size=1500,900',
      `--screenshot=${path.join(brainDir, 'settled_trip_party_view.png')}`,
      'http://localhost:8089/pages/trips.html?view=settled&openModal=settledParty'
    ]);
    console.log('✓ settled_trip_party_view.png captured');

    // 5. Capture Settled Payment Details View
    console.log('Capturing Settled Payment Details View...');
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=7000',
      '--window-size=1500,900',
      `--screenshot=${path.join(brainDir, 'settled_payment_details_view.png')}`,
      'http://localhost:8089/pages/trips.html?view=settled&openModal=settledPayment'
    ]);
    console.log('✓ settled_payment_details_view.png captured');

    // 6. Capture Settled Owner Payment Details View
    console.log('Capturing Settled Owner Payment Details View...');
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=7000',
      '--window-size=1500,900',
      `--screenshot=${path.join(brainDir, 'settled_owner_payment_view.png')}`,
      'http://localhost:8089/pages/trips.html?view=settled&openModal=settledOwnerPayment'
    ]);
    console.log('✓ settled_owner_payment_view.png captured');

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
    console.log('Server stopped.');
  }
});
