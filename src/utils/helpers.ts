/**
 * Helper utility functions for tests
 */

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Wait for specified milliseconds
 */
export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format date to string
 */
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Get timestamp string
 */
export function getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
}
