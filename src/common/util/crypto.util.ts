import * as crypto from 'crypto';
import { Config } from './config';

export class CryptoUtil {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly SALT = Buffer.from('deeptrust_salt');
    private static readonly IV_LENGTH = 12; // 96 bits for GCM
    private static readonly TAG_LENGTH = 16;
    private static readonly ITERATIONS = 100000;
    private static readonly KEY_LENGTH = 32;

    private static getKey(): Buffer {
        return crypto.pbkdf2Sync(
            Config.ENCRYPTION_KEY,
            this.SALT,
            this.ITERATIONS,
            this.KEY_LENGTH,
            'sha256'
        );
    }

    static encrypt(text: string): string {
        const key = this.getKey();
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

        let ciphertext = cipher.update(text, 'utf8');
        ciphertext = Buffer.concat([ciphertext, cipher.final()]);
        const authTag = cipher.getAuthTag();

        // Concatenate IV + Ciphertext (which includes auth tag in python usually? No, python returns text, but we need to store tag)
        // Wait, Python snippet said: `return base64.b64encode(iv + ciphertext).decode()`
        // In Python `aesgcm.encrypt()` returns ciphertext + tag.
        // So we need to store IV + Ciphertext + Tag here.

        const combined = Buffer.concat([iv, ciphertext, authTag]);
        return combined.toString('base64');
    }

    static decrypt(encryptedText: string): string {
        const combined = Buffer.from(encryptedText, 'base64');

        // Extract parts
        const iv = combined.subarray(0, this.IV_LENGTH);
        const authTag = combined.subarray(combined.length - this.TAG_LENGTH);
        const ciphertext = combined.subarray(this.IV_LENGTH, combined.length - this.TAG_LENGTH);

        const key = this.getKey();
        const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(ciphertext, undefined, 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
