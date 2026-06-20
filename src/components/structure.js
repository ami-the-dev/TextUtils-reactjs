/**
 * Extracts JSON-LD structured data from a string of HTML.
 * @param {string} html - HTML content to parse
 * @returns {Array<object>} Array of JSON-LD objects found
 */
export function extractJsonLd(html) {
  const results = [];
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      results.push(parsed);
    } catch {
      // Skip invalid JSON-LD blocks
    }
  }

  return results;
}

export default { extractJsonLd };
