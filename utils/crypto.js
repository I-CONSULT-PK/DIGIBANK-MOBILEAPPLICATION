import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { SECRET } from '@env';

const ALGORITHM = 'aes-256-gcm';
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATION = 65535;
const ENCRYPTED_POSITION = SALT_LENGTH + IV_LENGTH;

class GCM {
    constructor(secret) {
        this.secret = secret;
    }

    getKey(salt) {
        return pbkdf2Sync(this.secret, salt, ITERATION, KEY_LENGTH, 'sha512');
    }

    encrypt(plainText) {
        const salt = randomBytes(SALT_LENGTH);
        const iv = randomBytes(IV_LENGTH);

        const key = this.getKey(salt);

        const cipher = createCipheriv(ALGORITHM, key, iv);
        const encrypted = Buffer.concat([
            cipher.update(String(plainText), 'utf8'),
            cipher.final(),
        ]);

        const tag = cipher.getAuthTag();
        return Buffer.concat([salt, iv, encrypted, tag]).toString('base64');
    }

    decrypt(cipherText) {
        const stringValue = Buffer.from(String(cipherText), 'base64');

        const salt = stringValue.slice(0, SALT_LENGTH);
        const iv = stringValue.slice(SALT_LENGTH, ENCRYPTED_POSITION);
        const encrypted = stringValue.slice(ENCRYPTED_POSITION, stringValue.length - TAG_LENGTH);
        const tag = stringValue.slice(-TAG_LENGTH);

        const key = this.getKey(salt);
        const decipher = createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(tag);

        return decipher.update(encrypted) + decipher.final('utf8');
    }
}

let secretKey = SECRET;
let plainText = 'Affan';

let gcm = new GCM(secretKey);

let encryptedValue = gcm.encrypt(plainText);
let decryptedValue = gcm.decrypt(encryptedValue);

console.table({
    encryptedValue,
    decryptedValue
});

export default GCM;
