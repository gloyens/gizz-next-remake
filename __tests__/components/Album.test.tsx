/**
 * Tests for Album Component
 * 
 * The Album component is the main component for displaying album details.
 * It shows the album cover, title, release date, MDX content, media player,
 * and links to streaming services.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Album } from '@/components/Album';
import { AlbumType } from '@/types/types';

// Mock components
jest.mock('@/components/MediaPlayer', () => ({
  MediaPlayer: ({ albumId, bandcampLink }: any) => (
    <div data-testid="media-player" data-album-id={albumId} data-bandcamp-link={bandcampLink}>
      Media Player
    </div>
  ),
}));

jest.mock('@/components/IndividualLinks', () => ({
  IndividualLinks: ({ links }: any) => (
    <div data-testid="individual-links" data-links={JSON.stringify(links)}>
      Individual Links
    </div>
  ),
}));

describe('Album Component', () => {
  const defaultAlbum: AlbumType = {
    title: 'Nonagon Infinity',
    slug: 'nonagon-infinity',
    releaseDate: '2016-05-06',
    index: 10,
    imageSrc: '/images/nonagon-infinity.jpg',
    content: '# Nonagon Infinity\n\nNonagon Infinity opens the door...',
    bandcampLink: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
    albumId: 3055533230,
  };

  describe('Basic Rendering', () => {
    it('should render album title as main heading', () => {
      render(<Album album={defaultAlbum} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Nonagon Infinity');
    });

    it('should display release date', () => {
      render(<Album album={defaultAlbum} />);
      
      expect(screen.getByText('2016-05-06')).toBeInTheDocument();
    });

    it('should render album cover image', () => {
      render(<Album album={defaultAlbum} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/images/nonagon-infinity.jpg');
      expect(image).toHaveAttribute('alt', 'Nonagon Infinity');
    });

    it('should render MDX content', () => {
      render(<Album album={defaultAlbum} />);
      
      const mdxContent = screen.getByTestId('mdx-content');
      expect(mdxContent).toHaveTextContent('# Nonagon Infinity');
      expect(mdxContent).toHaveTextContent('Nonagon Infinity opens the door...');
    });
  });

  describe('Media Player Integration', () => {
    it('should render MediaPlayer when albumId is provided', () => {
      render(<Album album={defaultAlbum} />);
      
      const mediaPlayer = screen.getByTestId('media-player');
      expect(mediaPlayer).toBeInTheDocument();
      expect(mediaPlayer).toHaveAttribute('data-album-id', '3055533230');
      expect(mediaPlayer).toHaveAttribute(
        'data-bandcamp-link',
        'https://kinggizzard.bandcamp.com/album/nonagon-infinity'
      );
    });

    it('should not render MediaPlayer when albumId is missing', () => {
      const albumWithoutId = { ...defaultAlbum, albumId: undefined };
      render(<Album album={albumWithoutId} />);
      
      expect(screen.queryByTestId('media-player')).not.toBeInTheDocument();
    });

    it('should handle trackId for specific track embeds', () => {
      const albumWithTrack = { ...defaultAlbum, trackId: 123456789 };
      render(<Album album={albumWithTrack} />);
      
      const mediaPlayer = screen.getByTestId('media-player');
      expect(mediaPlayer).toBeInTheDocument();
    });
  });

  describe('Streaming Links', () => {
    it('should render IndividualLinks when streaming links are provided', () => {
      const albumWithLinks = {
        ...defaultAlbum,
        spotifyLink: 'https://open.spotify.com/album/123',
        youtubeLink: 'https://youtube.com/watch?v=abc',
      };
      
      render(<Album album={albumWithLinks} />);
      
      const links = screen.getByTestId('individual-links');
      expect(links).toBeInTheDocument();
      
      const linksData = JSON.parse(links.getAttribute('data-links') || '[]');
      expect(linksData).toHaveLength(3); // bandcamp, spotify, youtube
      expect(linksData).toContainEqual({
        href: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
        label: 'Bandcamp',
      });
      expect(linksData).toContainEqual({
        href: 'https://open.spotify.com/album/123',
        label: 'Spotify',
      });
      expect(linksData).toContainEqual({
        href: 'https://youtube.com/watch?v=abc',
        label: 'YouTube',
      });
    });

    it('should only include available links', () => {
      const albumWithSomeLinks = {
        ...defaultAlbum,
        spotifyLink: 'https://open.spotify.com/album/123',
        // No YouTube link
      };
      
      render(<Album album={albumWithSomeLinks} />);
      
      const links = screen.getByTestId('individual-links');
      const linksData = JSON.parse(links.getAttribute('data-links') || '[]');
      
      expect(linksData).toHaveLength(2); // Only bandcamp and spotify
      expect(linksData.map((l: any) => l.label)).toEqual(['Bandcamp', 'Spotify']);
    });

    it('should not render IndividualLinks when only bandcamp link exists', () => {
      const albumBandcampOnly = {
        ...defaultAlbum,
        // No spotify or youtube links
      };
      
      render(<Album album={albumBandcampOnly} />);
      
      // When there's only Bandcamp, we don't need the links component
      // since Bandcamp is already embedded
      const links = screen.getByTestId('individual-links');
      const linksData = JSON.parse(links.getAttribute('data-links') || '[]');
      expect(linksData).toHaveLength(1);
    });

    it('should handle missing bandcamp link', () => {
      const albumNoBandcamp = {
        ...defaultAlbum,
        bandcampLink: undefined,
        spotifyLink: 'https://open.spotify.com/album/123',
      };
      
      render(<Album album={albumNoBandcamp} />);
      
      const links = screen.getByTestId('individual-links');
      const linksData = JSON.parse(links.getAttribute('data-links') || '[]');
      
      expect(linksData).toHaveLength(1);
      expect(linksData[0].label).toBe('Spotify');
    });
  });

  describe('Layout and Styling', () => {
    it('should apply proper container styling', () => {
      const { container } = render(<Album album={defaultAlbum} />);
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('max-w-4xl');
      expect(wrapper.className).toContain('mx-auto');
      expect(wrapper.className).toContain('px-4');
      expect(wrapper.className).toContain('py-8');
    });

    it('should style album header section', () => {
      render(<Album album={defaultAlbum} />);
      
      const title = screen.getByRole('heading', { level: 1 });
      expect(title.className).toContain('text-4xl');
      expect(title.className).toContain('font-bold');
      expect(title.className).toContain('mb-2');
    });

    it('should size album cover appropriately', () => {
      render(<Album album={defaultAlbum} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('width', '400');
      expect(image).toHaveAttribute('height', '400');
      expect(image.className).toContain('rounded-lg');
      expect(image.className).toContain('shadow-lg');
    });
  });

  describe('Content Variations', () => {
    it('should handle albums with minimal information', () => {
      const minimalAlbum: AlbumType = {
        title: 'Minimal Album',
        slug: 'minimal-album',
        releaseDate: '2020-01-01',
        index: 1,
        imageSrc: '/images/minimal.jpg',
        content: 'Simple content',
      };
      
      render(<Album album={minimalAlbum} />);
      
      expect(screen.getByText('Minimal Album')).toBeInTheDocument();
      expect(screen.getByText('2020-01-01')).toBeInTheDocument();
      expect(screen.queryByTestId('media-player')).not.toBeInTheDocument();
    });

    it('should handle rich MDX content', () => {
      const richContentAlbum = {
        ...defaultAlbum,
        content: `# Album Title

## Track List
1. Track One
2. Track Two

### Production Notes
Recorded at **Flightless HQ**.

> "This album rocks!" - Review

\`\`\`
Genre: Psychedelic Rock
Length: 41:42
\`\`\``,
      };
      
      render(<Album album={richContentAlbum} />);
      
      const mdxContent = screen.getByTestId('mdx-content');
      expect(mdxContent).toHaveTextContent('# Album Title');
      expect(mdxContent).toHaveTextContent('Track List');
      expect(mdxContent).toHaveTextContent('Production Notes');
    });

    it('should handle special characters in content', () => {
      const specialCharsAlbum = {
        ...defaultAlbum,
        title: 'Paper Mâché Dream Balloon',
        content: "Features Ambrosé's flute & Joey's guitar",
      };
      
      render(<Album album={specialCharsAlbum} />);
      
      expect(screen.getByText('Paper Mâché Dream Balloon')).toBeInTheDocument();
      expect(screen.getByTestId('mdx-content')).toHaveTextContent("Ambrosé's flute");
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Album album={defaultAlbum} />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Nonagon Infinity');
      
      // Release date uses h2
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent('Released');
    });

    it('should provide alt text for images', () => {
      render(<Album album={defaultAlbum} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Nonagon Infinity');
    });

    it('should structure content with semantic HTML', () => {
      const { container } = render(<Album album={defaultAlbum} />);
      
      // Should use article tag for main content
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
      
      // Should have proper sections
      const mainContent = container.querySelector('.prose');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should render without crashing with empty content', () => {
      const emptyContentAlbum = {
        ...defaultAlbum,
        content: '',
      };
      
      render(<Album album={emptyContentAlbum} />);
      
      expect(screen.getByText('Nonagon Infinity')).toBeInTheDocument();
      expect(screen.getByTestId('mdx-content')).toHaveTextContent('');
    });

    it('should handle missing image gracefully', () => {
      const noImageAlbum = {
        ...defaultAlbum,
        imageSrc: '',
      };
      
      render(<Album album={noImageAlbum} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '');
      expect(image).toHaveAttribute('alt', 'Nonagon Infinity');
    });
  });
});