const crypto = require('crypto');

// Predefined key
const key = Buffer.from('71cc333c98b040abe408b6b5b95fce057254fcb139731c2375f8c3717b81efd7', 'hex');

// Encryption function
function encryptText(text, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedText: encrypted, iv: iv.toString('hex') };
}

// Decryption function
function decryptText(encryptedText, iv, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const password = 'password123';

// Simulating database operations
let encryptedPassword, iv;
{
    const { encryptedText, iv: generatedIv } = encryptText(password, key);
    encryptedPassword = encryptedText;
    iv = generatedIv;
}
console.log('Encrypted Password:', encryptedPassword);
console.log('Initialization Vector (IV):', iv);

// Simulating fetching encrypted password from the database
const fetchedEncryptedPassword = encryptedPassword; // This would be fetched from the database
console.log('Fetched Encrypted Password:', fetchedEncryptedPassword);

// Decrypting fetched encrypted password
const decryptedPassword = decryptText(fetchedEncryptedPassword, iv, key);
console.log('Decrypted Password:', decryptedPassword);
