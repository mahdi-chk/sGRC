import crypto from 'crypto';

const ITERATIONS = 100000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

/**
 * Hashes a password using PBKDF2 with a random salt.
 * @param password The plain text password
 * @returns An object containing the derived hash and the salt, both as hex strings.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
    return { hash, salt };
}

/**
 * Verifies a password against a stored hash and salt.
 * @param password The plain text password to verify
 * @param hash The stored hash hex string
 * @param salt The stored salt hex string
 * @returns true if the password matches, false otherwise
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
    const verifyHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
    return hash === verifyHash;
}
