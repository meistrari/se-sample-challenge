import { describe, it, expect, beforeAll } from 'vitest';
import { search } from '../src/index.js';

const sampleDocuments = [
  { id: 'doc1', content: 'JavaScript is a versatile programming language used for web development' },
  { id: 'doc2', content: 'Python is excellent for data science and machine learning applications' },
  { id: 'doc3', content: 'TypeScript adds static typing to JavaScript for better development experience' },
  { id: 'doc4', content: 'React is a popular JavaScript library for building user interfaces' },
  { id: 'doc5', content: 'Machine learning algorithms can process large datasets efficiently' }
];

describe('Document Search System', () => {
  describe('Basic Search Functionality', () => {
    it('should return empty array when no documents match', () => {
      const results = search(sampleDocuments, 'nonexistent');
      expect(results).toEqual([]);
    });

    it('should find exact keyword matches', () => {
      const results = search(sampleDocuments, 'JavaScript');
      expect(results).toHaveLength(3);
      expect(results.map(r => r.id)).toContain('doc1');
      expect(results.map(r => r.id)).toContain('doc3');
      expect(results.map(r => r.id)).toContain('doc4');
    });

    it('should be case insensitive', () => {
      const results = search(sampleDocuments, 'javascript');
      expect(results).toHaveLength(3);
      expect(results.map(r => r.id)).toContain('doc1');
    });

    it('should find partial word matches', () => {
      const results = search(sampleDocuments, 'learn');
      expect(results).toHaveLength(2);
      expect(results.map(r => r.id)).toContain('doc2');
      expect(results.map(r => r.id)).toContain('doc5');
    });
  });

  describe('Scoring and Ranking', () => {
    it('should return results with numeric scores', () => {
      const results = search(sampleDocuments, 'JavaScript');
      results.forEach(result => {
        expect(typeof result.score).toBe('number');
        expect(result.score).toBeGreaterThan(0);
      });
    });

    it('should sort results by relevance score (highest first)', () => {
      const results = search(sampleDocuments, 'machine');
      expect(results).toHaveLength(2);
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    });

    it('should give higher scores to more frequent keyword matches', () => {
      const docs = [
        { id: 'a', content: 'python programming' },
        { id: 'b', content: 'python python programming python' }
      ];
      const results = search(docs, 'python');
      expect(results).toHaveLength(2);
      const resultB = results.find(r => r.id === 'b')!;
      const resultA = results.find(r => r.id === 'a')!;
      expect(resultB.score).toBeGreaterThan(resultA.score);
    });

    it('should give higher scores to title/beginning matches', () => {
      const docs = [
        { id: 'a', content: 'programming with python is fun' },
        { id: 'b', content: 'python programming tutorial' }
      ];
      const results = search(docs, 'python');
      expect(results).toHaveLength(2);
      const resultB = results.find(r => r.id === 'b')!;
      const resultA = results.find(r => r.id === 'a')!;
      expect(resultB.score).toBeGreaterThan(resultA.score);
    });
  });

  describe('Performance Requirements', () => {
    let largeDataset: Array<{ id: string; content: string }>;

    beforeAll(() => {
      // Generate a larger dataset for performance testing
      largeDataset = [];
      for (let i = 0; i < 10000; i++) {
        largeDataset.push({
          id: `doc${i}`,
          content: `Document ${i} contains various keywords like programming, development, testing, and implementation. Some documents also mention specific technologies.`
        });
      }
    });

    it('should handle large datasets efficiently', () => {
      const startTime = Date.now();
      const results = search(largeDataset, 'programming');
      const endTime = Date.now();
      
      expect(results.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should be fast enough for repeated searches', () => {
      const queries = ['programming', 'development', 'testing', 'implementation'];
      const startTime = Date.now();
      
      queries.forEach(query => {
        search(largeDataset, query);
      });
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(2000); // 4 searches within 2 seconds
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty document array', () => {
      const results = search([], 'test');
      expect(results).toEqual([]);
    });

    it('should handle empty search keyword', () => {
      const results = search(sampleDocuments, '');
      expect(results).toEqual([]);
    });

    it('should handle documents with empty content', () => {
      const docs = [
        { id: 'empty', content: '' },
        { id: 'normal', content: 'python programming' }
      ];
      const results = search(docs, 'python');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('normal');
    });

    it('should handle special characters in search', () => {
      const docs = [
        { id: 'special', content: 'API endpoints use HTTP methods like GET, POST, PUT' }
      ];
      const results = search(docs, 'API');
      expect(results).toHaveLength(1);
    });

    it('should handle very long documents', () => {
      const longContent = 'word '.repeat(10000) + 'target keyword here';
      const docs = [{ id: 'long', content: longContent }];
      const results = search(docs, 'target');
      expect(results).toHaveLength(1);
    });
  });

  describe('Multiple Keywords', () => {
    it('should handle multiple keywords in search query', () => {
      const results = search(sampleDocuments, 'JavaScript development');
      expect(results.length).toBeGreaterThan(0);
      // Should find documents containing either "JavaScript" or "development"
    });

    it('should give higher scores to documents matching multiple keywords', () => {
      const docs = [
        { id: 'single', content: 'JavaScript programming tutorial' },
        { id: 'multiple', content: 'JavaScript development and web development' }
      ];
      const results = search(docs, 'JavaScript development');
      expect(results).toHaveLength(2);
      const multipleResult = results.find(r => r.id === 'multiple')!;
      const singleResult = results.find(r => r.id === 'single')!;
      expect(multipleResult.score).toBeGreaterThan(singleResult.score);
    });
  });
});