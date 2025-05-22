# Lightweight Indexing System - Sample Challenge

This is a sample challenge to help candidates get familiar with the setup and testing environment used in our solution engineering assessments.

## The Challenge

Implement a search function that can quickly find keywords within a collection of documents. Your function should return matching documents sorted by relevance score.

```typescript
export function search(
  documents: Array<{id: string, content: string}>, 
  keyword: string
): Array<{id: string, score: number}>
```

The function needs to:
- Find documents containing the search keyword
- Calculate relevance scores for matching documents  
- Return results sorted by score (highest first)
- Handle case-insensitive matching
- Work efficiently with large document sets

## Setup

```bash
npm install
npm test
```

## Running Tests

```bash
npm test           # Run all tests
npm run test:watch # Watch mode for development
```

## Test Data

Generate larger datasets for performance testing:

```bash
npm run generate-data        # 1,000 documents
npm run generate-data 5000   # 5,000 documents
```

The current implementation returns an empty array. Your job is to make the tests pass.

This sample challenge helps you practice with TypeScript, Vitest, and our testing patterns before tackling the real assessment challenges.