/**
 * Tests for TypeScript Type Definitions
 * 
 * These tests document and validate the type structures used throughout
 * the application. They ensure type safety and serve as documentation
 * for the data shapes expected by various components.
 */

import { AlbumType, Frontmatter } from '@/types/types';

describe('Type Definitions', () => {
  describe('Frontmatter Type', () => {
    it('should define required properties for MDX frontmatter', () => {
      // Frontmatter is the metadata at the top of MDX files
      const validFrontmatter: Frontmatter = {
        title: 'Nonagon Infinity',
        releaseDate: '2016-05-06',
        index: 10,
        imageSrc: '/images/nonagon-infinity.jpg',
      };

      // TypeScript ensures all required fields are present
      expect(validFrontmatter.title).toBe('Nonagon Infinity');
      expect(validFrontmatter.releaseDate).toBe('2016-05-06');
      expect(validFrontmatter.index).toBe(10);
      expect(validFrontmatter.imageSrc).toBe('/images/nonagon-infinity.jpg');
    });

    it('should allow optional streaming service links', () => {
      const frontmatterWithLinks: Frontmatter = {
        title: 'Flying Microtonal Banana',
        releaseDate: '2017-02-24',
        index: 11,
        imageSrc: '/images/flying-microtonal-banana.jpg',
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/flying-microtonal-banana',
        spotifyLink: 'https://open.spotify.com/album/2eUigDDUXXP5kn6jBMmQVB',
        youtubeLink: 'https://youtube.com/playlist?list=OLAK5uy',
      };

      expect(frontmatterWithLinks.bandcampLink).toBeDefined();
      expect(frontmatterWithLinks.spotifyLink).toBeDefined();
      expect(frontmatterWithLinks.youtubeLink).toBeDefined();
    });

    it('should allow optional media player IDs', () => {
      const frontmatterWithIds: Frontmatter = {
        title: 'Murder of the Universe',
        releaseDate: '2017-06-23',
        index: 12,
        imageSrc: '/images/murder-of-the-universe.jpg',
        albumId: 3055533230,
        trackId: 123456789,
      };

      expect(frontmatterWithIds.albumId).toBe(3055533230);
      expect(frontmatterWithIds.trackId).toBe(123456789);
    });

    it('should work with minimal required fields only', () => {
      const minimalFrontmatter: Frontmatter = {
        title: 'Minimal Album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/minimal.jpg',
      };

      // Optional fields should be undefined
      expect(minimalFrontmatter.bandcampLink).toBeUndefined();
      expect(minimalFrontmatter.spotifyLink).toBeUndefined();
      expect(minimalFrontmatter.youtubeLink).toBeUndefined();
      expect(minimalFrontmatter.albumId).toBeUndefined();
      expect(minimalFrontmatter.trackId).toBeUndefined();
    });
  });

  describe('AlbumType', () => {
    it('should extend Frontmatter with additional fields', () => {
      // AlbumType includes all Frontmatter fields plus slug and content
      const album: AlbumType = {
        title: 'Nonagon Infinity',
        slug: 'nonagon-infinity',
        releaseDate: '2016-05-06',
        index: 10,
        imageSrc: '/images/nonagon-infinity.jpg',
        content: '# Nonagon Infinity\n\nAlbum description...',
      };

      // Has all Frontmatter fields
      expect(album.title).toBe('Nonagon Infinity');
      expect(album.releaseDate).toBe('2016-05-06');
      expect(album.index).toBe(10);
      expect(album.imageSrc).toBe('/images/nonagon-infinity.jpg');
      
      // Plus additional fields
      expect(album.slug).toBe('nonagon-infinity');
      expect(album.content).toContain('# Nonagon Infinity');
    });

    it('should inherit optional fields from Frontmatter', () => {
      const fullAlbum: AlbumType = {
        title: 'K.G.',
        slug: 'kg',
        releaseDate: '2020-10-20',
        index: 20,
        imageSrc: '/images/kg.jpg',
        content: 'Album content',
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/kg',
        spotifyLink: 'https://open.spotify.com/album/kg',
        youtubeLink: 'https://youtube.com/kg',
        albumId: 1234567890,
        trackId: 987654321,
      };

      // All optional fields should be available
      expect(fullAlbum.bandcampLink).toBeDefined();
      expect(fullAlbum.spotifyLink).toBeDefined();
      expect(fullAlbum.youtubeLink).toBeDefined();
      expect(fullAlbum.albumId).toBeDefined();
      expect(fullAlbum.trackId).toBeDefined();
    });
  });

  describe('Type Relationships', () => {
    it('should ensure AlbumType is compatible with Frontmatter', () => {
      const album: AlbumType = {
        title: 'Test Album',
        slug: 'test-album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/test.jpg',
        content: 'Content',
      };

      // Can extract Frontmatter from AlbumType
      const frontmatter: Frontmatter = {
        title: album.title,
        releaseDate: album.releaseDate,
        index: album.index,
        imageSrc: album.imageSrc,
        bandcampLink: album.bandcampLink,
        spotifyLink: album.spotifyLink,
        youtubeLink: album.youtubeLink,
        albumId: album.albumId,
        trackId: album.trackId,
      };

      expect(frontmatter.title).toBe(album.title);
    });
  });

  describe('Field Constraints and Patterns', () => {
    it('should document expected date format', () => {
      const album: AlbumType = {
        title: 'Date Format Example',
        slug: 'date-format',
        releaseDate: '2023-12-25', // YYYY-MM-DD format
        index: 1,
        imageSrc: '/test.jpg',
        content: '',
      };

      // Date should be in YYYY-MM-DD format
      expect(album.releaseDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should document expected slug format', () => {
      const album: AlbumType = {
        title: 'Slug Format Example',
        slug: 'slug-format-example', // kebab-case
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/test.jpg',
        content: '',
      };

      // Slug should be kebab-case
      expect(album.slug).toMatch(/^[a-z0-9-]+$/);
    });

    it('should document expected image path format', () => {
      const album: AlbumType = {
        title: 'Image Path Example',
        slug: 'image-path',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/album-cover.jpg', // Starts with /images/
        content: '',
      };

      // Image paths should start with /images/
      expect(album.imageSrc).toMatch(/^\/images\//);
    });

    it('should document URL formats for streaming links', () => {
      const album: AlbumType = {
        title: 'URL Format Example',
        slug: 'url-format',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/test.jpg',
        content: '',
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/test',
        spotifyLink: 'https://open.spotify.com/album/123456',
        youtubeLink: 'https://youtube.com/watch?v=abc123',
      };

      // Bandcamp links follow pattern
      expect(album.bandcampLink).toMatch(/^https:\/\/.*\.bandcamp\.com\//);
      
      // Spotify links follow pattern
      expect(album.spotifyLink).toMatch(/^https:\/\/open\.spotify\.com\//);
      
      // YouTube links follow pattern
      expect(album.youtubeLink).toMatch(/^https:\/\/(www\.)?youtube\.com\//);
    });
  });

  describe('Type Usage Examples', () => {
    it('should document how types are used in components', () => {
      // Example: Album component receives AlbumType
      const componentProps: { album: AlbumType } = {
        album: {
          title: 'Component Example',
          slug: 'component-example',
          releaseDate: '2020-01-01',
          index: 1,
          imageSrc: '/images/example.jpg',
          content: 'MDX content here',
        },
      };

      expect(componentProps.album.title).toBe('Component Example');
    });

    it('should document how types are used in MDX utilities', () => {
      // Example: getAllFrontmatter returns array of albums with Frontmatter + slug
      type GetAllFrontmatterReturn = Array<Frontmatter & { slug: string }>;
      
      const mdxResult: GetAllFrontmatterReturn = [
        {
          title: 'Album 1',
          slug: 'album-1',
          releaseDate: '2020-01-01',
          index: 1,
          imageSrc: '/images/1.jpg',
        },
        {
          title: 'Album 2',
          slug: 'album-2',
          releaseDate: '2020-02-01',
          index: 2,
          imageSrc: '/images/2.jpg',
        },
      ];

      expect(mdxResult).toHaveLength(2);
      expect(mdxResult[0].slug).toBe('album-1');
    });
  });

  describe('Type Guards and Validation', () => {
    it('should be able to check if object is valid Frontmatter', () => {
      const isValidFrontmatter = (obj: any): obj is Frontmatter => {
        return (
          typeof obj.title === 'string' &&
          typeof obj.releaseDate === 'string' &&
          typeof obj.index === 'number' &&
          typeof obj.imageSrc === 'string'
        );
      };

      const valid = {
        title: 'Valid',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/valid.jpg',
      };

      const invalid = {
        title: 'Invalid',
        // Missing required fields
      };

      expect(isValidFrontmatter(valid)).toBe(true);
      expect(isValidFrontmatter(invalid)).toBe(false);
    });

    it('should be able to check if object is valid AlbumType', () => {
      const isValidAlbum = (obj: any): obj is AlbumType => {
        return (
          typeof obj.title === 'string' &&
          typeof obj.slug === 'string' &&
          typeof obj.releaseDate === 'string' &&
          typeof obj.index === 'number' &&
          typeof obj.imageSrc === 'string' &&
          typeof obj.content === 'string'
        );
      };

      const validAlbum = {
        title: 'Valid Album',
        slug: 'valid-album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/valid.jpg',
        content: 'Content',
      };

      expect(isValidAlbum(validAlbum)).toBe(true);
    });
  });
});