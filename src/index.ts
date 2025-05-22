// The candidate needs to implement a lightweight indexing system
// that can quickly search for keywords in a set of documents

/**
 * Search for documents that contain the keyword
 * @param documents Array of documents to search
 * @param keyword Keyword to search for
 * @returns Array of document IDs with their relevance scores, sorted by relevance (highest first)
 */
export function search(
  documents: Array<{id: string, content: string}>, 
  keyword: string
): Array<{id: string, score: number}> {
  // Implementation to be completed by the candidate
  return [];
}