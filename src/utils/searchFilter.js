/**
 * Filters contacts based on a search query matching against contact names
 * @param {Array} contacts - Array of contacts to filter
 * @param {string} query - Search query string
 * @returns {Array} Filtered array of contacts matching the query
 */
export function searchFilter(contacts, query) {
  try {
    // Handle null or undefined contacts array
    if (!contacts || !Array.isArray(contacts)) {
      return [];
    }

    // Handle null, undefined, or non-string query
    if (!query || typeof query !== 'string') {
      return contacts;
    }

    // Handle empty or whitespace-only search query - return all contacts
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      return contacts;
    }

    // Normalize query for case-insensitive matching
    const normalizedQuery = trimmedQuery.toLowerCase();

    // Filter contacts with case-insensitive name matching and safe access
    return contacts.filter((contact) => {
      // Skip invalid contact entries
      if (!contact || typeof contact !== 'object') {
        return false;
      }

      // Skip contacts without a name property
      if (!contact.name || typeof contact.name !== 'string') {
        return false;
      }

      // Perform case-insensitive name matching
      return contact.name.toLowerCase().includes(normalizedQuery);
    });
  } catch (err) {
    // If any error occurs during filtering, log it and return empty array
    console.error('Error filtering contacts:', err);
    return [];
  }
}
