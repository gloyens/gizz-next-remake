/**
 * Tests for Array Utilities
 * 
 * The sortByIndex function is used throughout the application to maintain
 * consistent ordering of albums in the discography. Albums can have an
 * optional index property that determines their display order.
 */

import { sortByIndex } from '@/utils/array';

describe('sortByIndex', () => {
  describe('Basic functionality', () => {
    it('should sort objects by index property in ascending order', () => {
      // When displaying albums, they need to be in chronological order
      const albums = [
        { title: 'Album C', index: 3 },
        { title: 'Album A', index: 1 },
        { title: 'Album B', index: 2 },
      ];

      const sorted = sortByIndex(albums);

      expect(sorted).toEqual([
        { title: 'Album A', index: 1 },
        { title: 'Album B', index: 2 },
        { title: 'Album C', index: 3 },
      ]);
    });

    it('should handle negative indices correctly', () => {
      // Negative indices might be used for special albums or pre-releases
      const items = [
        { name: 'Regular Album', index: 1 },
        { name: 'Pre-release', index: -1 },
        { name: 'Another Album', index: 2 },
      ];

      const sorted = sortByIndex(items);

      expect(sorted).toEqual([
        { name: 'Pre-release', index: -1 },
        { name: 'Regular Album', index: 1 },
        { name: 'Another Album', index: 2 },
      ]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty arrays', () => {
      // Empty album lists should not cause errors
      expect(sortByIndex([])).toEqual([]);
    });

    it('should handle single-item arrays', () => {
      const singleAlbum = [{ title: 'Only Album', index: 1 }];
      expect(sortByIndex(singleAlbum)).toEqual(singleAlbum);
    });

    it('should handle items with same index by preserving original order (stable sort)', () => {
      // Multiple albums released on the same day might have the same index
      const items = [
        { title: 'First Added', index: 1 },
        { title: 'Second Added', index: 1 },
        { title: 'Third Added', index: 1 },
      ];

      const sorted = sortByIndex(items);

      // JavaScript's sort is stable since ES2019, so original order is preserved
      expect(sorted).toEqual(items);
    });
  });

  describe('Missing or invalid index handling', () => {
    it('should place items without index property at the end', () => {
      // Some albums might not have an index assigned yet
      const items = [
        { title: 'Album B', index: 2 },
        { title: 'No Index Album' },
        { title: 'Album A', index: 1 },
      ] as Array<{ title: string; index?: number }>;

      const sorted = sortByIndex(items);

      expect(sorted).toEqual([
        { title: 'Album A', index: 1 },
        { title: 'Album B', index: 2 },
        { title: 'No Index Album' },
      ]);
    });

    it('should handle undefined index values by placing them at the end', () => {
      const items = [
        { title: 'Album B', index: 2 },
        { title: 'Undefined Index', index: undefined },
        { title: 'Album A', index: 1 },
      ];

      const sorted = sortByIndex(items);

      expect(sorted).toEqual([
        { title: 'Album A', index: 1 },
        { title: 'Album B', index: 2 },
        { title: 'Undefined Index', index: undefined },
      ]);
    });

    it('should treat null index as missing and place at end', () => {
      const items = [
        { title: 'Album B', index: 2 },
        { title: 'Null Index', index: null as any },
        { title: 'Album A', index: 1 },
      ];

      const sorted = sortByIndex(items);

      expect(sorted).toEqual([
        { title: 'Album A', index: 1 },
        { title: 'Album B', index: 2 },
        { title: 'Null Index', index: null },
      ]);
    });
  });

  describe('Type safety and immutability', () => {
    it('should not modify the original array', () => {
      // Important for React state management
      const original = [
        { id: 1, index: 3 },
        { id: 2, index: 1 },
        { id: 3, index: 2 },
      ];
      const originalCopy = [...original];

      sortByIndex(original);

      expect(original).toEqual(originalCopy);
    });

    it('should work with any object shape that has an index property', () => {
      // The function is generic and works with any object type
      const complexItems = [
        { name: 'Item 1', index: 2, metadata: { color: 'red' } },
        { name: 'Item 2', index: 1, metadata: { color: 'blue' } },
      ];

      const sorted = sortByIndex(complexItems);

      expect(sorted[0].index).toBe(1);
      expect(sorted[0].metadata.color).toBe('blue');
      expect(sorted[1].index).toBe(2);
      expect(sorted[1].metadata.color).toBe('red');
    });
  });

  describe('Real-world usage scenarios', () => {
    it('should correctly sort a typical album list', () => {
      // This represents how albums are actually sorted in the application
      const albums = [
        { title: 'Flying Microtonal Banana', slug: 'flying-microtonal-banana', index: 11 },
        { title: 'Nonagon Infinity', slug: 'nonagon-infinity', index: 10 },
        { title: 'Murder of the Universe', slug: 'murder-of-the-universe', index: 12 },
        { title: 'Unreleased Demo', slug: 'unreleased-demo' }, // No index
      ] as Array<{ title: string; slug: string; index?: number }>;

      const sorted = sortByIndex(albums);

      expect(sorted.map(a => a.slug)).toEqual([
        'nonagon-infinity',
        'flying-microtonal-banana',
        'murder-of-the-universe',
        'unreleased-demo',
      ]);
    });
  });
});