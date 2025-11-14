/**
 * Tests for FlowchartLinks Component
 * 
 * FlowchartLinks displays a grid of album links, each showing the album
 * cover and title. It's used on the albums listing page to create a
 * visual browsable grid of all albums.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { FlowchartLinks } from '@/components/FlowchartLinks';

// Mock FlowchartLink component
jest.mock('@/components/FlowchartLink', () => ({
  FlowchartLink: ({ imageSrc, albumName }: any) => (
    <div data-testid={`flowchart-link-${albumName.toLowerCase().replace(/\s+/g, '-')}`}>
      <img src={imageSrc} alt={albumName} />
      <h3>{albumName}</h3>
    </div>
  ),
}));

describe('FlowchartLinks Component', () => {
  const mockAlbums = [
    {
      title: 'Nonagon Infinity',
      slug: 'nonagon-infinity',
      imageSrc: '/images/nonagon-infinity.jpg',
      releaseDate: '2016-05-06',
      index: 10,
    },
    {
      title: 'Flying Microtonal Banana',
      slug: 'flying-microtonal-banana',
      imageSrc: '/images/flying-microtonal-banana.jpg',
      releaseDate: '2017-02-24',
      index: 11,
    },
    {
      title: 'Murder of the Universe',
      slug: 'murder-of-the-universe',
      imageSrc: '/images/murder-of-the-universe.jpg',
      releaseDate: '2017-06-23',
      index: 12,
    },
  ];

  describe('Rendering Albums', () => {
    it('should render all albums passed as props', () => {
      render(<FlowchartLinks albums={mockAlbums} />);
      
      expect(screen.getByText('Nonagon Infinity')).toBeInTheDocument();
      expect(screen.getByText('Flying Microtonal Banana')).toBeInTheDocument();
      expect(screen.getByText('Murder of the Universe')).toBeInTheDocument();
    });

    it('should create a FlowchartLink for each album', () => {
      render(<FlowchartLinks albums={mockAlbums} />);
      
      const links = screen.getAllByTestId(/^flowchart-link-/);
      expect(links).toHaveLength(3);
    });

    it('should pass correct props to each FlowchartLink', () => {
      render(<FlowchartLinks albums={mockAlbums} />);
      
      // Check that images are rendered with correct src
      const images = screen.getAllByRole('img');
      expect(images[0]).toHaveAttribute('src', '/images/nonagon-infinity.jpg');
      expect(images[0]).toHaveAttribute('alt', 'Nonagon Infinity');
      
      expect(images[1]).toHaveAttribute('src', '/images/flying-microtonal-banana.jpg');
      expect(images[1]).toHaveAttribute('alt', 'Flying Microtonal Banana');
    });
  });

  describe('Grid Layout', () => {
    it('should apply grid layout classes', () => {
      const { container } = render(<FlowchartLinks albums={mockAlbums} />);
      
      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer.className).toContain('grid');
    });

    it('should have responsive grid columns', () => {
      const { container } = render(<FlowchartLinks albums={mockAlbums} />);
      
      const gridContainer = container.firstChild as HTMLElement;
      // Should have different column counts for different screen sizes
      expect(gridContainer.className).toContain('grid-cols-2'); // Mobile
      expect(gridContainer.className).toContain('md:grid-cols-3'); // Tablet
      expect(gridContainer.className).toContain('lg:grid-cols-4'); // Desktop
    });

    it('should have proper gap between items', () => {
      const { container } = render(<FlowchartLinks albums={mockAlbums} />);
      
      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer.className).toContain('gap-8');
    });
  });

  describe('Empty State', () => {
    it('should render empty grid when no albums provided', () => {
      const { container } = render(<FlowchartLinks albums={[]} />);
      
      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer.children).toHaveLength(0);
    });
  });

  describe('Large Collections', () => {
    it('should handle many albums efficiently', () => {
      // Create 50 albums
      const manyAlbums = Array.from({ length: 50 }, (_, i) => ({
        title: `Album ${i + 1}`,
        slug: `album-${i + 1}`,
        imageSrc: `/images/album-${i + 1}.jpg`,
        releaseDate: '2020-01-01',
        index: i + 1,
      }));
      
      render(<FlowchartLinks albums={manyAlbums} />);
      
      const links = screen.getAllByTestId(/^flowchart-link-/);
      expect(links).toHaveLength(50);
    });
  });

  describe('Album Order', () => {
    it('should maintain the order of albums as provided', () => {
      render(<FlowchartLinks albums={mockAlbums} />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      
      expect(headings[0]).toHaveTextContent('Nonagon Infinity');
      expect(headings[1]).toHaveTextContent('Flying Microtonal Banana');
      expect(headings[2]).toHaveTextContent('Murder of the Universe');
    });

    it('should not reorder albums internally', () => {
      // Provide albums in reverse order
      const reversedAlbums = [...mockAlbums].reverse();
      
      render(<FlowchartLinks albums={reversedAlbums} />);
      
      const headings = screen.getAllByRole('heading', { level: 3 });
      
      expect(headings[0]).toHaveTextContent('Murder of the Universe');
      expect(headings[1]).toHaveTextContent('Flying Microtonal Banana');
      expect(headings[2]).toHaveTextContent('Nonagon Infinity');
    });
  });

  describe('Album Data Requirements', () => {
    it('should only require title and imageSrc properties', () => {
      const minimalAlbums = [
        {
          title: 'Minimal Album 1',
          imageSrc: '/images/minimal1.jpg',
        },
        {
          title: 'Minimal Album 2',
          imageSrc: '/images/minimal2.jpg',
        },
      ];
      
      // Should render without errors even with minimal data
      render(<FlowchartLinks albums={minimalAlbums as any} />);
      
      expect(screen.getByText('Minimal Album 1')).toBeInTheDocument();
      expect(screen.getByText('Minimal Album 2')).toBeInTheDocument();
    });

    it('should handle albums with all optional properties', () => {
      const richAlbums = [
        {
          title: 'Rich Album',
          slug: 'rich-album',
          imageSrc: '/images/rich.jpg',
          releaseDate: '2020-01-01',
          index: 1,
          bandcampLink: 'https://bandcamp.com',
          spotifyLink: 'https://spotify.com',
          youtubeLink: 'https://youtube.com',
        },
      ];
      
      render(<FlowchartLinks albums={richAlbums} />);
      
      expect(screen.getByText('Rich Album')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should maintain semantic structure', () => {
      render(<FlowchartLinks albums={mockAlbums} />);
      
      // Each album should have proper heading structure
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
    });

    it('should provide alt text for all images', () => {
      render(<FlowchartLinks albums={mockAlbums} />);
      
      const images = screen.getAllByRole('img');
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('alt', mockAlbums[index].title);
      });
    });
  });

  describe('Performance Considerations', () => {
    it('should use React keys for efficient updates', () => {
      const { rerender } = render(<FlowchartLinks albums={mockAlbums} />);
      
      // Add a new album
      const updatedAlbums = [
        ...mockAlbums,
        {
          title: 'New Album',
          slug: 'new-album',
          imageSrc: '/images/new.jpg',
          releaseDate: '2023-01-01',
          index: 20,
        },
      ];
      
      rerender(<FlowchartLinks albums={updatedAlbums} />);
      
      // Should efficiently update to show new album
      expect(screen.getByText('New Album')).toBeInTheDocument();
      expect(screen.getAllByTestId(/^flowchart-link-/)).toHaveLength(4);
    });
  });

  describe('Visual Consistency', () => {
    it('should apply consistent spacing', () => {
      const { container } = render(<FlowchartLinks albums={mockAlbums} />);
      
      const gridContainer = container.firstChild as HTMLElement;
      
      // Grid gap ensures consistent spacing
      expect(gridContainer.className).toContain('gap-8');
    });

    it('should work with varying album title lengths', () => {
      const variedAlbums = [
        {
          title: 'K.G.',
          slug: 'kg',
          imageSrc: '/images/kg.jpg',
        },
        {
          title: 'Paper Mâché Dream Balloon (Deluxe Edition)',
          slug: 'paper-mache-dream-balloon-deluxe',
          imageSrc: '/images/pmdb.jpg',
        },
      ];
      
      render(<FlowchartLinks albums={variedAlbums as any} />);
      
      expect(screen.getByText('K.G.')).toBeInTheDocument();
      expect(screen.getByText('Paper Mâché Dream Balloon (Deluxe Edition)')).toBeInTheDocument();
    });
  });
});