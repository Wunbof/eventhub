// Generate JWT Secret
const crypto = require('crypto');

// Generate a secure random 64-character string
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('='.repeat(60));
console.log('🔐 Generated JWT Secret:');
console.log('='.repeat(60));
console.log(jwtSecret);
console.log('='.repeat(60));
console.log('\n✅ Copy this and add it to Railway as JWT_SECRET');
console.log('   It should be 64 characters long\n');

