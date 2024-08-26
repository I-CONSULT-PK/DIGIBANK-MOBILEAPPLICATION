import CryptoJS from 'crypto-es';

// Secret keys for HMAC and AES
const hmacKey = '12345678901234567890123456789012'; // 32 bytes
const aesKey = '12345678901234567890123456789012'; // 32 bytes for AES-256

// Encrypt the message
const encrypt = (plaintext) => {
  // Generate a random 16-byte IV
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt the plaintext using AES-CBC with the generated IV
  const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(aesKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // Generate HMAC for the encrypted data
  const hmac = CryptoJS.HmacSHA256(encrypted.ciphertext, CryptoJS.enc.Utf8.parse(hmacKey));

  // Combine IV, encrypted data, and HMAC
  const combined = iv.concat(encrypted.ciphertext).concat(hmac);

  // Encode the combined data to Base64
  const base64Combined = CryptoJS.enc.Base64.stringify(combined);

  return base64Combined;
};


// Example usage
const message = 'From Javascript!';
const encryptedMessage = encrypt(message);
console.log('Encrypted Message:', encryptedMessage);


// Decrypt the message
const decrypt = (encryptedData) => {
  // Decode from Base64
  const data = CryptoJS.enc.Base64.parse(encryptedData);

  // Extract the IV, Ciphertext, and HMAC
  const iv = CryptoJS.lib.WordArray.create(data.words.slice(0, 4), 16);
  const ciphertext = CryptoJS.lib.WordArray.create(
    data.words.slice(4, data.words.length - 8)
  );
  const hmac = CryptoJS.lib.WordArray.create(
    data.words.slice(data.words.length - 8)
  );

  // Verify HMAC
  const calculatedHmac = CryptoJS.HmacSHA256(
    ciphertext,
    CryptoJS.enc.Utf8.parse(hmacKey)
  );
  if (calculatedHmac.toString() !== hmac.toString()) {
    throw new Error('Invalid HMAC: The message has been tampered with.');
  }

  // Decrypt using AES-CBC
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: ciphertext },
    CryptoJS.enc.Utf8.parse(aesKey),
    { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);

  return originalMessage;
};


// Example usage
try {
  const decryptedMessage = decrypt(
    'qlVvpFnF4UKDJ7hEm5fwbRgOYwrd8zO617+S5Vd4etswmyCiPAL/UJA4kd9yfCMTGjxfCwid9/J5CXHyL4iN4g=='
  );
  console.log('Decrypted Message:', decryptedMessage);
} catch (error) {
  console.error('Decryption failed:', error.message);
}