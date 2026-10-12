const { execFileSync } = require('child_process');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\ac3217be-821d-40b2-8aca-faf03e763b04';

// Capture open trip details with specific scroll
execFileSync(edgePath, [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=6000',
  '--window-size=1440,1200',
  '--screenshot=' + brainDir + '\\open_trip_card3_focus.png',
  'http://localhost:8080/pages/trips.html?view=open&openModal=details'
]);
console.log('open_trip_card3_focus.png captured');
