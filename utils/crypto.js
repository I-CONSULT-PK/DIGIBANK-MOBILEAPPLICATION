import CryptoJS from 'crypto-es';

// Secret keys for HMAC and AES (use the same keys as in your Java code)
const hmacKey = '1234567890123456';
const aesKey = '1234567890123456'; // 16 bytes for AES-128

// Encrypt the message
export const encrypt = (message) => {
    // Generate a random IV (Initialization Vector)
    const iv = CryptoJS.lib.WordArray.random(16); // 16 bytes IV for AES

    // Encrypt the message using AES with the generated IV
    const encrypted = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aesKey), { iv: iv }).toString();

    // Generate HMAC for the encrypted message
    const hmac = CryptoJS.HmacSHA256(encrypted, hmacKey).toString(CryptoJS.enc.Base64);

    // Combine IV (Base64 encoded), the encrypted message, and the HMAC
    const combined = `${CryptoJS.enc.Base64.stringify(iv)}:${encrypted}:${hmac}`;

    return combined;
};

// Decrypt the message
export const decrypt = (combined) => {
    const [ivBase64, encryptedMessage, receivedHmac] = combined.split(':');

    // Verify HMAC
    const calculatedHmac = CryptoJS.HmacSHA256(encryptedMessage, hmacKey).toString(CryptoJS.enc.Base64);
    if (calculatedHmac !== receivedHmac) {
        throw new Error('Invalid HMAC: The message has been tampered with.');
    }

    // Decrypt the message using AES
    const iv = CryptoJS.enc.Base64.parse(ivBase64); // Parse the IV from Base64
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, CryptoJS.enc.Utf8.parse(aesKey), { iv: iv });
    const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);
    return originalMessage;
};