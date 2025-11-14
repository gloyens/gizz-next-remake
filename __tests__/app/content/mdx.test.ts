/**
 * Tests for MDX Content Utilities
 * 
 * These utilities handle loading and processing MDX files that contain
 * album information. MDX allows mixing of Markdown content with React
 * components, making it perfect for rich album descriptions.
 */

import { getAllFrontmatter, getMdxBySlug, getAlbumData } from '@/app/content/mdx';
import fs from 'fs';
import path from 'path';

jest.mock('fs');
jest.mock('path');

describe('MDX Content Utilities', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockPath = path as jest.Mocked<typeof path>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup path.join to work like the real implementation
    mockPath.join.mockImplementation((...args) => args.join('/'));
    mockPath.resolve.mockImplementation((...args) => args.join('/'));
  });

  describe('getAllFrontmatter', () => {
    it('should read all MDX files and extract frontmatter', () => {
      // Mock directory listing
      mockFs.readdirSync.mockReturnValue([
        'nonagon-infinity.mdx',
        'flying-microtonal-banana.mdx',
        'polygondwanaland.mdx',
        '.DS_Store', // Should be ignored
        'README.md', // Should be ignored
      ] as any);

      // Mock file contents
      const fileContents = {
        'nonagon-infinity.mdx': `---
title: "Nonagon Infinity"
releaseDate: "2016-05-06"
index: 10
imageSrc: "/images/nonagon-infinity.jpg"
bandcampLink: "https://kinggizzard.bandcamp.com/album/nonagon-infinity"
---

Nonagon Infinity opens the door...`,
        'flying-microtonal-banana.mdx': `---
title: "Flying Microtonal Banana"
releaseDate: "2017-02-24"
index: 11
imageSrc: "/images/flying-microtonal-banana.jpg"
---

Explorations in microtonal tuning...`,
        'polygondwanaland.mdx': `---
title: "Polygondwanaland"
releaseDate: "2017-11-17"
index: 13
imageSrc: "/images/polygondwanaland.jpg"
youtubeLink: "https://youtube.com/watch?v=polygondwanaland"
---

Free release for all...`,
      };

      mockFs.readFileSync.mockImplementation((filepath) => {
        const filename = filepath.toString().split('/').pop();
        return fileContents[filename as keyof typeof fileContents] || '';
      });

      const result = getAllFrontmatter();

      // Should return 3 albums (excluding non-MDX files)
      expect(result).toHaveLength(3);

      // Check first album
      expect(result[0]).toEqual({
        title: 'Nonagon Infinity',
        slug: 'nonagon-infinity',
        releaseDate: '2016-05-06',
        index: 10,
        imageSrc: '/images/nonagon-infinity.jpg',
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
      });

      // Check that optional fields are included when present
      expect(result[2].youtubeLink).toBe('https://youtube.com/watch?v=polygondwanaland');

      // Verify files were read from correct directory
      expect(mockFs.readdirSync).toHaveBeenCalledWith(expect.stringContaining('/data/albums'));
    });

    it('should handle empty directory', () => {
      mockFs.readdirSync.mockReturnValue([]);

      const result = getAllFrontmatter();

      expect(result).toEqual([]);
    });

    it('should skip files that fail to parse', () => {
      mockFs.readdirSync.mockReturnValue([
        'good-album.mdx',
        'bad-album.mdx',
      ] as any);

      mockFs.readFileSync.mockImplementation((filepath) => {
        if (filepath.toString().includes('bad-album')) {
          throw new Error('File read error');
        }
        return `---
title: "Good Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/images/good.jpg"
---`;
      });

      const result = getAllFrontmatter();

      // Should only return the successfully parsed album
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Good Album');
    });
  });

  describe('getMdxBySlug', () => {
    it('should read and parse a specific MDX file by slug', () => {
      const mdxContent = `---
title: "Nonagon Infinity"
releaseDate: "2016-05-06"
index: 10
imageSrc: "/images/nonagon-infinity.jpg"
bandcampLink: "https://kinggizzard.bandcamp.com/album/nonagon-infinity"
spotifyLink: "https://open.spotify.com/album/nonagon"
youtubeLink: "https://youtube.com/watch?v=nonagon"
---

# Nonagon Infinity

Nonagon Infinity opens the door, Nonagon Infinity opens the door...

## Track List

1. Robot Stop
2. Big Fig Wasp
3. Gamma Knife
4. People-Vultures
5. Mr. Beat
6. Evil Death Roll
7. Invisible Face
8. Wah Wah
9. Road Train`;

      mockFs.readFileSync.mockReturnValue(mdxContent);

      const result = getMdxBySlug('nonagon-infinity');

      expect(result).toEqual({
        frontmatter: {
          title: 'Nonagon Infinity',
          slug: 'nonagon-infinity',
          releaseDate: '2016-05-06',
          index: 10,
          imageSrc: '/images/nonagon-infinity.jpg',
          bandcampLink: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
          spotifyLink: 'https://open.spotify.com/album/nonagon',
          youtubeLink: 'https://youtube.com/watch?v=nonagon',
        },
        content: expect.stringContaining('# Nonagon Infinity'),
      });

      // Verify correct file path construction
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/\/data\/albums\/nonagon-infinity\.mdx$/),
        'utf8'
      );
    });

    it('should handle missing files gracefully', () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });

      expect(() => getMdxBySlug('non-existent-album')).toThrow();
    });

    it('should preserve MDX content structure', () => {
      const mdxWithComponents = `---
title: "Test Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/test.jpg"
---

# Test Album

<YouTubeEmbed videoId="abc123" />

This album features:

- Great songs
- Amazing production

<SpotifyPlayer albumId="xyz789" />`;

      mockFs.readFileSync.mockReturnValue(mdxWithComponents);

      const result = getMdxBySlug('test-album');

      // Content should preserve MDX components
      expect(result.content).toContain('<YouTubeEmbed videoId="abc123" />');
      expect(result.content).toContain('<SpotifyPlayer albumId="xyz789" />');
    });
  });

  describe('getAlbumData', () => {
    it('should combine frontmatter and content for an album', () => {
      const albumContent = `---
title: "Flying Microtonal Banana"
releaseDate: "2017-02-24"
index: 11
imageSrc: "/images/flying-microtonal-banana.jpg"
bandcampLink: "https://kinggizzard.bandcamp.com/album/flying-microtonal-banana"
---

# Flying Microtonal Banana

King Gizzard's first exploration into microtonal music...`;

      mockFs.readFileSync.mockReturnValue(albumContent);

      const result = getAlbumData('flying-microtonal-banana');

      expect(result).toEqual({
        title: 'Flying Microtonal Banana',
        slug: 'flying-microtonal-banana',
        releaseDate: '2017-02-24',
        index: 11,
        imageSrc: '/images/flying-microtonal-banana.jpg',
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/flying-microtonal-banana',
        content: expect.stringContaining('# Flying Microtonal Banana'),
      });
    });

    it('should handle albums with minimal frontmatter', () => {
      const minimalContent = `---
title: "Minimal Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/minimal.jpg"
---

Simple content.`;

      mockFs.readFileSync.mockReturnValue(minimalContent);

      const result = getAlbumData('minimal-album');

      expect(result).toEqual({
        title: 'Minimal Album',
        slug: 'minimal-album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/minimal.jpg',
        content: expect.stringContaining('Simple content.'),
      });

      // Optional fields should be undefined
      expect(result.bandcampLink).toBeUndefined();
      expect(result.spotifyLink).toBeUndefined();
      expect(result.youtubeLink).toBeUndefined();
    });
  });

  describe('File system integration', () => {
    it('should work with different file path structures', () => {
      mockFs.readdirSync.mockReturnValue(['test.mdx'] as any);
      mockFs.readFileSync.mockReturnValue(`---
title: "Test"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/test.jpg"
---`);

      getAllFrontmatter();

      // Should construct proper paths regardless of current directory
      expect(mockPath.join).toHaveBeenCalled();
      expect(mockFs.readdirSync).toHaveBeenCalledWith(
        expect.stringContaining('data/albums')
      );
    });
  });

  describe('Content processing', () => {
    it('should handle various markdown features in content', () => {
      const richContent = `---
title: "Rich Content Album"
releaseDate: "2020-01-01"
index: 1
imageSrc: "/rich.jpg"
---

# Album Title

## Features

- **Bold text**
- *Italic text*
- \`inline code\`

\`\`\`javascript
// Code block
const album = "awesome";
\`\`\`

> Blockquote from review

[Link to band](https://kinggizzard.com)

![Album art](/images/album.jpg)`;

      mockFs.readFileSync.mockReturnValue(richContent);

      const result = getMdxBySlug('rich-content-album');

      // All markdown should be preserved
      expect(result.content).toContain('**Bold text**');
      expect(result.content).toContain('```javascript');
      expect(result.content).toContain('> Blockquote');
      expect(result.content).toContain('[Link to band]');
    });
  });
});