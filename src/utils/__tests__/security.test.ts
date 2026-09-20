import { sanitizeText, safeText } from '../security';

describe('Security & Sanitization Utility Tests', () => {
  test('strips HTML script tags safely', () => {
    const input = '<script>alert("xss")</script>';
    const sanitized = sanitizeText(input);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
  });

  test('handles fallback strings safely', () => {
    expect(safeText('', 'Fallback')).toBe('Fallback');
    expect(safeText(null, 'Fallback')).toBe('Fallback');
    expect(safeText('Valid Title', 'Fallback')).toBe('Valid Title');
  });
});
