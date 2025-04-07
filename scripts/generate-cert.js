const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

// Generate self-signed certificate
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, {
  algorithm: 'sha256',
  days: 365,
  keySize: 2048,
});

// Create cert directory if it doesn't exist
const certDir = path.join(__dirname, '..', 'cert');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

// Write certificate files
fs.writeFileSync(path.join(certDir, 'cert.pem'), pems.cert);
fs.writeFileSync(path.join(certDir, 'key.pem'), pems.private);

console.log('SSL certificates generated successfully!'); 