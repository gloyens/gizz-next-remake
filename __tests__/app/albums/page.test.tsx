/**
 * Tests for Albums Listing Page
 * 
 * The albums page displays all King Gizzard albums in a grid layout,
 * sorted by their index (chronological order). Users can click on any
 * album to view its details.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AlbumsPage from '@/app/albums/page';
import { getAllFrontmatter } from '@/app/content/mdx';

// Mock dependencies
jest.mock('@/app/content/mdx');
jest.mock('@/components/FlowchartLinks', () => ({
  FlowchartLinks: ({ albums }: any) => (
    <div data-testid="flowchart-links" data-albums={JSON.stringify(albums)}>
      {albums.map((album: any) => (
        <div key={album.slug} data-testid={`album-${album.slug}`}>
          {album.title}
        </div>
      ))}
    </div>
  ),
}));

describe('Albums Listing Page', () => {
  const mockAlbums = [
    {
      title: 'Nonagon Infinity',
      slug: 'nonagon-infinity',
      releaseDate: '2016-05-06',
      index: 10,
      imageSrc: '/images/nonagon-infinity.jpg',
    },
    {
      title: 'Flying Microtonal Banana',
      slug: 'flying-microtonal-banana',
      releaseDate: '2017-02-24',
      index: 11,
      imageSrc: '/images/flying-microtonal-banana.jpg',
    },
    {
      title: 'Murder of the Universe',
      slug: 'murder-of-the-universe',
      releaseDate: '2017-06-23',
      index: 12,
      imageSrc: '/images/murder-of-the-universe.jpg',
    },
    {
      title: 'Polygondwanaland',
      slug: 'polygondwanaland',
      releaseDate: '2017-11-17',
      index: 13,
      imageSrc: '/images/polygondwanaland.jpg',
    },
  ];

  beforeEach(() => {
    (getAllFrontmatter as jest.Mock).mockReturnValue(mockAlbums);
  });

  describe('Page Structure', () => {
    it('should render the page heading', () => {
      render(<AlbumsPage />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Albums');
    });

    it('should load all albums from MDX files', () => {
      render(<AlbumsPage />);
      
      expect(getAllFrontmatter).toHaveBeenCalled();
    });

    it('should pass albums to FlowchartLinks component', () => {
      render(<AlbumsPage />);
      
      const flowchartLinks = screen.getByTestId('flowchart-links');
      const albumsData = JSON.parse(flowchartLinks.getAttribute('data-albums') || '[]');
      
      expect(albumsData).toHaveLength(4);
      expect(albumsData).toEqual(mockAlbums);
    });
  });

  describe('Album Sorting', () => {
    it('should sort albums by index in ascending order', () => {
      // Provide albums in random order
      const unsortedAlbums = [
        { ...mockAlbums[2], index: 12 }, // Murder of the Universe
        { ...mockAlbums[0], index: 10 }, // Nonagon Infinity
        { ...mockAlbums[3], index: 13 }, // Polygondwanaland
        { ...mockAlbums[1], index: 11 }, // Flying Microtonal Banana
      ];
      
      (getAllFrontmatter as jest.Mock).mockReturnValue(unsortedAlbums);
      
      render(<AlbumsPage />);
      
      const flowchartLinks = screen.getByTestId('flowchart-links');
      const sortedAlbums = JSON.parse(flowchartLinks.getAttribute('data-albums') || '[]');
      
      // Check that albums are sorted by index
      expect(sortedAlbums[0].index).toBe(10);
      expect(sortedAlbums[1].index).toBe(11);
      expect(sortedAlbums[2].index).toBe(12);
      expect(sortedAlbums[3].index).toBe(13);
    });

    it('should handle albums without index', () => {
      const albumsWithMissingIndex = [
        { ...mockAlbums[0], index: 10 },
        { ...mockAlbums[1], index: undefined }, // No index
        { ...mockAlbums[2], index: 12 },
      ];
      
      (getAllFrontmatter as jest.Mock).mockReturnValue(albumsWithMissingIndex);
      
      render(<AlbumsPage />);
      
      const flowchartLinks = screen.getByTestId('flowchart-links');
      const sortedAlbums = JSON.parse(flowchartLinks.getAttribute('data-albums') || '[]');
      
      // Albums without index should be at the end
      expect(sortedAlbums[0].index).toBe(10);
      expect(sortedAlbums[1].index).toBe(12);
      expect(sortedAlbums[2].index).toBeUndefined();
    });
  });

  describe('Layout and Styling', () => {
    it('should use proper container styling', () => {
      const { container } = render(<AlbumsPage />);
      
      const pageContainer = container.firstChild as HTMLElement;
      expect(pageContainer.className).toContain('container');
      expect(pageContainer.className).toContain('mx-auto');
      expect(pageContainer.className).toContain('px-4');
      expect(pageContainer.className).toContain('py-8');
    });

    it('should style the heading appropriately', () => {
      render(<AlbumsPage />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.className).toContain('text-4xl');
      expect(heading.className).toContain('font-bold');
      expect(heading.className).toContain('mb-8');
      expect(heading.className).toContain('text-center');
    });
  });

  describe('Empty State', () => {
    it('should handle empty album list', () => {
      (getAllFrontmatter as jest.Mock).mockReturnValue([]);
      
      render(<AlbumsPage />);
      
      const flowchartLinks = screen.getByTestId('flowchart-links');
      const albumsData = JSON.parse(flowchartLinks.getAttribute('data-albums') || '[]');
      
      expect(albumsData).toHaveLength(0);
    });
  });

  describe('Data Integrity', () => {
    it('should preserve all album properties', () => {
      const albumWithAllProps = {
        title: 'Test Album',
        slug: 'test-album',
        releaseDate: '2023-01-01',
        index: 20,
        imageSrc: '/images/test.jpg',
        bandcampLink: 'https://bandcamp.com/test',
        spotifyLink: 'https://spotify.com/test',
        youtubeLink: 'https://youtube.com/test',
      };
      
      (getAllFrontmatter as jest.Mock).mockReturnValue([albumWithAllProps]);
      
      render(<AlbumsPage />);
      
      const flowchartLinks = screen.getByTestId('flowchart-links');
      const albumsData = JSON.parse(flowchartLinks.getAttribute('data-albums') || '[]');
      
      expect(albumsData[0]).toEqual(albumWithAllProps);
    });
  });

  describe('Performance Considerations', () => {
    it('should handle large album collections', () => {
      // Create 50 albums
      const manyAlbums = Array.from({ length: 50 }, (_, i) => ({
        title: `Album ${i + 1}`,
        slug: `album-${i + 1}`,
        releaseDate: `2020-01-${String(i + 1).padStart(2, '0')}`,
        index: i + 1,
        imageSrc: `/images/album-${i + 1}.jpg`,
      }));
      
      (getAllFrontmatter as jest.Mock).mockReturnValue(manyAlbums);
      
      render(<AlbumsPage />);
      
      const flowchartLinks = screen.getByTestId('flowchart-links');
      const albumsData = JSON.parse(flowchartLinks.getAttribute('data-albums') || '[]');
      
      expect(albumsData).toHaveLength(50);
      // Should still be sorted
      expect(albumsData[0].index).toBe(1);
      expect(albumsData[49].index).toBe(50);
    });
  });

  describe('User Experience', () => {
    it('should display albums in chronological order for easy browsing', () => {
      render(<AlbumsPage />);
      
      const albumElements = screen.getAllByTestId(/^album-/);
      
      // Albums should appear in order
      expect(albumElements[0]).toHaveTextContent('Nonagon Infinity');
      expect(albumElements[1]).toHaveTextContent('Flying Microtonal Banana');
      expect(albumElements[2]).toHaveTextContent('Murder of the Universe');
      expect(albumElements[3]).toHaveTextContent('Polygondwanaland');
    });
  });

  describe('Integration with Components', () => {
    it('should work with FlowchartLinks grid layout', () => {
      render(<AlbumsPage />);
      
      // FlowchartLinks receives the sorted albums array
      const flowchartLinks = screen.getByTestId('flowchart-links');
      expect(flowchartLinks).toBeInTheDocument();
      
      // Each album should be rendered
      mockAlbums.forEach(album => {
        expect(screen.getByTestId(`album-${album.slug}`)).toBeInTheDocument();
      });
    });
  });

  describe('SEO and Metadata', () => {
    it('should have descriptive page title', () => {
      render(<AlbumsPage />);
      
      const heading = screen.getByRole('heading', { level: 1, name: 'Albums' });
      expect(heading).toBeInTheDocument();
    });
  });
});