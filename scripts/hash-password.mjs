// Ús: node scripts/hash-password.mjs <contrasenya>
// Imprimeix el hash SHA-256 per posar a src/data/patrociniAccess.js
import crypto from 'crypto';
const pwd = process.argv[2];
if (!pwd) { console.error('Ús: node scripts/hash-password.mjs <contrasenya>'); process.exit(1); }
console.log(crypto.createHash('sha256').update(pwd).digest('hex'));
