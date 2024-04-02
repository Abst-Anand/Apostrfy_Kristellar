// const crypto = require('crypto');

// // Predefined key and IV
// const key = Buffer.from('71cc333c98b040abe408b6b5b95fce057254fcb139731c2375f8c3717b81efd7', 'hex');
// const iv = Buffer.from('0123456789abcdef0123456789abcdef', 'hex'); // Use your own constant IV here

// // Encryption function
// function encryptText(text, key, iv) {
//     const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return { encryptedText: encrypted };
// }

// // Decryption function
// function decryptText(encryptedText, key, iv) {
//     const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

// // Example usage
// const password = 'password123';

// // Simulating database operations
// let encryptedPassword;
// {
//     const { encryptedText } = encryptText(password, key, iv);
//     encryptedPassword = encryptedText;
//     console.log(typeof encryptedText)
// }
// console.log('Encrypted Password:', encryptedPassword);

// // Simulating fetching encrypted password from the database
// const fetchedEncryptedPassword = encryptedPassword; // This would be fetched from the database
// console.log('Fetched Encrypted Password:', fetchedEncryptedPassword);

// // Decrypting fetched encrypted password
// const decryptedPassword = decryptText(fetchedEncryptedPassword, key, iv);
// console.log('Decrypted Password:', decryptedPassword);


// module.exports={
//     encryptText,
//     decryptText
// }