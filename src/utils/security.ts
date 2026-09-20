/**
 * Security and Data Sanitization Utility
 * Safely sanitizes user input and external dataset strings to prevent XSS or HTML injection.
 */

export function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export function safeText(text: string | null | undefined, fallback: string = 'N/A'): string {
  if (!text || text.trim() === '' || text === 'null' || text === 'undefined') {
    return fallback;
  }
  return text.trim();
}
