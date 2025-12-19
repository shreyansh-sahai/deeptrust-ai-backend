import * as crypto from 'crypto';
import { Config } from './config';

export class CryptoUtil {
    private static readonly algorithm = 'aes-256-cbc';

    // Ensure the key is exactly 32 bytes for aes-256-cbc
    private static getKey(): Buffer {
        return crypto.createHash('sha256').update(Config.ENCRYPTION_KEY).digest();
    }

    // Use a deterministic IV derived from the key (16 bytes for AES)
    private static getIv(): Buffer {
        return crypto.createHash('md5').update(Config.ENCRYPTION_KEY).digest();
    }

    static encrypt(text: string): string {
        const iv = this.getIv();
        const key = this.getKey();
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        // Return IV:EncryptedText encoded in base64
        return Buffer.from(`${iv.toString('hex')}:${encrypted}`).toString('base64');
    }

    static decrypt(text: string): string {
        const textParts = Buffer.from(text, 'base64').toString('utf8').split(':');
        const iv = Buffer.from(textParts.shift()!, 'hex');
        const encryptedText = textParts.join(':');
        const key = this.getKey();
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
