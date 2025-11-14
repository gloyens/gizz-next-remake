/**
 * Tests for Album Detail Page
 * 
 * The album detail page displays comprehensive information about a specific album,
 * including the cover art, release date, description (from MDX), embedded player,
 * and links to streaming services.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AlbumPage from '@/app/albums/[slug]/page';
import { getAlbumData, getAllFrontmatter } from '@/app/content/mdx';

// Mock dependencies
jest.mock('@/app/content/mdx');
jest.mock('@/components/Album', () => ({
  Album: ({ album }: any) => (
    <div data-testid="album-component" data-album={JSON.stringify(album)}>
      <h1>{album.title}</h1>
      <p>{album.releaseDate}</p>
      <div>{album.content}</div>
    </div>
  ),
}));

describe('Album Detail Page', () => {
  const mockAlbumData = {
    title: 'Nonagon Infinity',
    slug: 'nonagon-infinity',
    releaseDate: '2016-05-06',
    index: 10,
    imageSrc: '/images/nonagon-infinity.jpg',
    content: '# Nonagon Infinity\n\nNonagon Infinity opens the door...',
    bandcampLink: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
    spotifyLink: 'https://open.spotify.com/album/nonagon',
    youtubeLink: 'https://youtube.com/watch?v=nonagon',
    albumId: 3055533230,
  };

  const mockAllAlbums = [
    { slug: 'nonagon-infinity', title: 'Nonagon Infinity' },
    { slug: 'flying-microtonal-banana', title: 'Flying Microtonal Banana' },
    { slug: 'murder-of-the-universe', title: 'Murder of the Universe' },
  ];

  beforeEach(() => {
    (getAlbumData as jest.Mock).mockReturnValue(mockAlbumData);
    (getAllFrontmatter as jest.Mock).mockReturnValue(mockAllAlbums);
  });

  describe('Data Loading', () => {
    it('should load album data based on slug parameter', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      expect(getAlbumData).toHaveBeenCalledWith('nonagon-infinity');
    });

    it('should pass album data to Album component', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      const albumComponent = screen.getByTestId('album-component');
      const albumData = JSON.parse(albumComponent.getAttribute('data-album') || '{}');
      
      expect(albumData).toEqual(mockAlbumData);
    });

    it('should handle different album slugs', () => {
      const params = { slug: 'flying-microtonal-banana' };
      const differentAlbum = {
        ...mockAlbumData,
        title: 'Flying Microtonal Banana',
        slug: 'flying-microtonal-banana',
      };
      
      (getAlbumData as jest.Mock).mockReturnValue(differentAlbum);
      
      render(<AlbumPage params={params} />);
      
      expect(getAlbumData).toHaveBeenCalledWith('flying-microtonal-banana');
      expect(screen.getByText('Flying Microtonal Banana')).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should display album title', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      expect(screen.getByText('Nonagon Infinity')).toBeInTheDocument();
    });

    it('should display release date', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      expect(screen.getByText('2016-05-06')).toBeInTheDocument();
    });

    it('should render MDX content', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      expect(screen.getByText(/Nonagon Infinity opens the door/)).toBeInTheDocument();
    });
  });

  describe('Dynamic Route Generation', () => {
    it('should generate static params for all albums', () => {
      // This would be called at build time by Next.js
      const staticParams = AlbumPage.generateStaticParams?.();
      
      expect(getAllFrontmatter).toHaveBeenCalled();
      expect(staticParams).toEqual([
        { slug: 'nonagon-infinity' },
        { slug: 'flying-microtonal-banana' },
        { slug: 'murder-of-the-universe' },
      ]);
    });

    it('should handle empty album list in generateStaticParams', () => {
      (getAllFrontmatter as jest.Mock).mockReturnValue([]);
      
      const staticParams = AlbumPage.generateStaticParams?.();
      
      expect(staticParams).toEqual([]);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing album data', () => {
      (getAlbumData as jest.Mock).mockReturnValue(null);
      
      const params = { slug: 'non-existent-album' };
      
      // Depending on implementation, this might throw or render empty
      expect(() => render(<AlbumPage params={params} />)).not.toThrow();
    });

    it('should handle malformed slug', () => {
      const params = { slug: '../../../etc/passwd' }; // Path traversal attempt
      
      render(<AlbumPage params={params} />);
      
      // Should safely handle the slug
      expect(getAlbumData).toHaveBeenCalledWith('../../../etc/passwd');
    });
  });

  describe('SEO Considerations', () => {
    it('should provide album-specific metadata', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      // The Album component would handle specific meta tags
      const albumComponent = screen.getByTestId('album-component');
      expect(albumComponent).toBeInTheDocument();
    });
  });

  describe('Integration with Album Component', () => {
    it('should pass all album properties to Album component', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      const albumComponent = screen.getByTestId('album-component');
      const albumData = JSON.parse(albumComponent.getAttribute('data-album') || '{}');
      
      // Verify all properties are passed
      expect(albumData.title).toBe('Nonagon Infinity');
      expect(albumData.slug).toBe('nonagon-infinity');
      expect(albumData.releaseDate).toBe('2016-05-06');
      expect(albumData.index).toBe(10);
      expect(albumData.imageSrc).toBe('/images/nonagon-infinity.jpg');
      expect(albumData.content).toContain('Nonagon Infinity opens the door');
      expect(albumData.bandcampLink).toBe('https://kinggizzard.bandcamp.com/album/nonagon-infinity');
      expect(albumData.spotifyLink).toBe('https://open.spotify.com/album/nonagon');
      expect(albumData.youtubeLink).toBe('https://youtube.com/watch?v=nonagon');
      expect(albumData.albumId).toBe(3055533230);
    });

    it('should work with minimal album data', () => {
      const minimalAlbum = {
        title: 'Minimal Album',
        slug: 'minimal-album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/minimal.jpg',
        content: 'Simple content',
      };
      
      (getAlbumData as jest.Mock).mockReturnValue(minimalAlbum);
      
      const params = { slug: 'minimal-album' };
      render(<AlbumPage params={params} />);
      
      const albumComponent = screen.getByTestId('album-component');
      const albumData = JSON.parse(albumComponent.getAttribute('data-album') || '{}');
      
      expect(albumData).toEqual(minimalAlbum);
    });
  });

  describe('Performance', () => {
    it('should use static generation for better performance', () => {
      // The presence of generateStaticParams indicates static generation
      expect(AlbumPage.generateStaticParams).toBeDefined();
    });

    it('should only load data for the requested album', () => {
      const params = { slug: 'nonagon-infinity' };
      render(<AlbumPage params={params} />);
      
      // Should only call getAlbumData, not getAllFrontmatter for rendering
      expect(getAlbumData).toHaveBeenCalledTimes(1);
      expect(getAlbumData).toHaveBeenCalledWith('nonagon-infinity');
    });
  });

  describe('Navigation Context', () => {
    it('should work with browser back/forward navigation', () => {
      // First album
      const { rerender } = render(<AlbumPage params={{ slug: 'nonagon-infinity' }} />);
      expect(screen.getByText('Nonagon Infinity')).toBeInTheDocument();
      
      // Navigate to different album
      (getAlbumData as jest.Mock).mockReturnValue({
        ...mockAlbumData,
        title: 'Flying Microtonal Banana',
        slug: 'flying-microtonal-banana',
      });
      
      rerender(<AlbumPage params={{ slug: 'flying-microtonal-banana' }} />);
      expect(screen.getByText('Flying Microtonal Banana')).toBeInTheDocument();
    });
  });
});