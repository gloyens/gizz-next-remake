/**
 * Tests for Get Random Album Utility
 * 
 * The getRandomAlbum function is used on the home page to display a random
 * album suggestion to visitors. It reads from the MDX album files and
 * returns a random album's metadata.
 */

import { getRandomAlbum } from '@/utils/getRandomAlbum';
import fs from 'fs';

// Mock fs module
jest.mock('fs');

describe('getRandomAlbum', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset Math.random for consistent testing
    jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('should return a random album from the albums directory', () => {
      // Mock file system with several album files
      mockFs.readdirSync.mockReturnValue([
        'nonagon-infinity.mdx',
        'flying-microtonal-banana.mdx',
        'murder-of-the-universe.mdx',
        'polygondwanaland.mdx',
        '.DS_Store', // Should be filtered out
      ] as any);

      // Mock file contents for each album
      const albumContents = {
        'nonagon-infinity.mdx': `---
title: "Nonagon Infinity"
releaseDate: "2016-05-06"
index: 10
imageSrc: "/images/nonagon-infinity.jpg"
---

Album content here...`,
        'flying-microtonal-banana.mdx': `---
title: "Flying Microtonal Banana"
releaseDate: "2017-02-24"
index: 11
imageSrc: "/images/flying-microtonal-banana.jpg"
---

Album content here...`,
        'murder-of-the-universe.mdx': `---
title: "Murder of the Universe"
releaseDate: "2017-06-23"
index: 12
imageSrc: "/images/murder-of-the-universe.jpg"
---

Album content here...`,
        'polygondwanaland.mdx': `---
title: "Polygondwanaland"
releaseDate: "2017-11-17"
index: 13
imageSrc: "/images/polygondwanaland.jpg"
---

Album content here...`,
      };

      mockFs.readFileSync.mockImplementation((path) => {
        const filename = path.toString().split('/').pop();
        return albumContents[filename as keyof typeof albumContents] || '';
      });

      // Mock Math.random to return a predictable value
      (Math.random as jest.Mock).mockReturnValue(0.5);

      const result = getRandomAlbum();

      expect(result).toEqual({
        title: 'Murder of the Universe',
        slug: 'murder-of-the-universe',
        releaseDate: '2017-06-23',
        index: 12,
        imageSrc: '/images/murder-of-the-universe.jpg',
      });

      expect(mockFs.readdirSync).toHaveBeenCalledWith(expect.stringContaining('/data/albums'));
    });

    it('should filter out non-MDX files', () => {
      mockFs.readdirSync.mockReturnValue([
        'album1.mdx',
        'album2.mdx',
        '.DS_Store',
        'README.md',
        'test.txt',
        '.gitignore',
      ] as any);

      mockFs.readFileSync.mockReturnValue(`---
title: "Test Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/images/test.jpg"
---`);

      (Math.random as jest.Mock).mockReturnValue(0);

      const result = getRandomAlbum();

      // Should only consider the .mdx files
      expect(result.slug).toBe('album1');
    });
  });

  describe('Random selection', () => {
    it('should be able to return any album from the list', () => {
      const albums = ['album1.mdx', 'album2.mdx', 'album3.mdx'];
      mockFs.readdirSync.mockReturnValue(albums as any);

      mockFs.readFileSync.mockImplementation((path) => {
        const filename = path.toString().split('/').pop()?.replace('.mdx', '');
        return `---
title: "${filename}"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/images/${filename}.jpg"
---`;
      });

      const results = new Set<string>();

      // Run multiple times to ensure randomness
      for (let i = 0; i < 100; i++) {
        (Math.random as jest.Mock).mockReturnValue(i / 100);
        const album = getRandomAlbum();
        results.add(album.slug);
      }

      // Should have selected different albums
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty albums directory', () => {
      mockFs.readdirSync.mockReturnValue([]);

      expect(() => getRandomAlbum()).toThrow();
    });

    it('should handle directory with no MDX files', () => {
      mockFs.readdirSync.mockReturnValue([
        '.DS_Store',
        'README.md',
        '.gitignore',
      ] as any);

      expect(() => getRandomAlbum()).toThrow();
    });

    it('should handle single album', () => {
      mockFs.readdirSync.mockReturnValue(['only-album.mdx'] as any);

      mockFs.readFileSync.mockReturnValue(`---
title: "Only Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/images/only.jpg"
---`);

      const result = getRandomAlbum();

      expect(result.slug).toBe('only-album');
      expect(result.title).toBe('Only Album');
    });
  });

  describe('Frontmatter parsing', () => {
    it('should correctly parse all frontmatter fields', () => {
      mockFs.readdirSync.mockReturnValue(['test-album.mdx'] as any);

      mockFs.readFileSync.mockReturnValue(`---
title: "Test Album Title"
releaseDate: "2023-12-25"
index: 42
imageSrc: "/images/test-album-cover.jpg"
bandcampLink: "https://kinggizzard.bandcamp.com/album/test"
spotifyLink: "https://open.spotify.com/album/test"
youtubeLink: "https://youtube.com/watch?v=test"
---

# Album Content

This is the album description.`);

      const result = getRandomAlbum();

      expect(result).toEqual({
        title: 'Test Album Title',
        slug: 'test-album',
        releaseDate: '2023-12-25',
        index: 42,
        imageSrc: '/images/test-album-cover.jpg',
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/test',
        spotifyLink: 'https://open.spotify.com/album/test',
        youtubeLink: 'https://youtube.com/watch?v=test',
      });
    });

    it('should handle missing optional frontmatter fields', () => {
      mockFs.readdirSync.mockReturnValue(['minimal-album.mdx'] as any);

      mockFs.readFileSync.mockReturnValue(`---
title: "Minimal Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/images/minimal.jpg"
---`);

      const result = getRandomAlbum();

      expect(result).toEqual({
        title: 'Minimal Album',
        slug: 'minimal-album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/minimal.jpg',
      });

      // Optional fields should be undefined
      expect(result.bandcampLink).toBeUndefined();
      expect(result.spotifyLink).toBeUndefined();
      expect(result.youtubeLink).toBeUndefined();
    });
  });

  describe('Error handling', () => {
    it('should handle file read errors', () => {
      mockFs.readdirSync.mockReturnValue(['album.mdx'] as any);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      expect(() => getRandomAlbum()).toThrow('File read error');
    });

    it('should handle malformed frontmatter', () => {
      mockFs.readdirSync.mockReturnValue(['bad-album.mdx'] as any);

      mockFs.readFileSync.mockReturnValue(`---
title: Unclosed frontmatter
releaseDate: "2020-01-01"

Content without closing ---`);

      // The actual behavior depends on the gray-matter library
      // but the function should handle it gracefully
      expect(() => getRandomAlbum()).not.toThrow();
    });
  });

  describe('Integration with file system', () => {
    it('should construct correct file paths', () => {
      mockFs.readdirSync.mockReturnValue(['test.mdx'] as any);
      mockFs.readFileSync.mockReturnValue(`---
title: "Test"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/test.jpg"
---`);

      getRandomAlbum();

      // Verify correct path construction
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/\/data\/albums\/test\.mdx$/),
        'utf8'
      );
    });
  });
});