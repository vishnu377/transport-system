const { execFileSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\ac3217be-821d-40b2-8aca-faf03e763b04';

console.log('Capturing Open Trip 3-Card Details screenshot...');
try {
  execFileSync(edgePath, [
    '--headless',
    '--disable-gpu',
    '--virtual-time-budget=6000',
    '--window-size=1440,1100',
    `--screenshot=${path.join(brainDir, 'open_trip_3cards_view.png')}`,
    'http://localhost:8080/pages/trips.html?view=open&openModal=details'
  ]);
  console.log('✓ open_trip_3cards_view.png captured successfully!');
} catch (e) {
  console.error('Error capturing 3 cards screenshot:', e.message);
}

console.log('Capturing Truck Owner Payment Details screenshot...');
try {
  execFileSync(edgePath, [
    '--headless',
    '--disable-gpu',
    '--virtual-time-budget=6000',
    '--window-size=1440,900',
    `--screenshot=${path.join(brainDir, 'truck_owner_payments_view.png')}`,
    'http://localhost:8080/pages/trips.html?view=open&openModal=truckOwnerPayments'
  ]);
  console.log('✓ truck_owner_payments_view.png captured successfully!');
} catch (e) {
  console.error('Error capturing Truck Owner Payments screenshot:', e.message);
}
