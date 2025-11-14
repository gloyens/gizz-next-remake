/**
 * Tests for IndividualLinks Component
 * 
 * IndividualLinks displays a list of external links to streaming services
 * (Bandcamp, Spotify, YouTube) for an album. It's used on album detail
 * pages to provide multiple listening options.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IndividualLinks } from '@/components/IndividualLinks';

describe('IndividualLinks Component', () => {
  const defaultLinks = [
    { href: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity', label: 'Bandcamp' },
    { href: 'https://open.spotify.com/album/nonagon', label: 'Spotify' },
    { href: 'https://youtube.com/watch?v=nonagon', label: 'YouTube' },
  ];

  describe('Rendering Links', () => {
    it('should render all provided links', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      expect(screen.getByRole('link', { name: 'Bandcamp' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Spotify' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'YouTube' })).toBeInTheDocument();
    });

    it('should set correct href for each link', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      expect(screen.getByRole('link', { name: 'Bandcamp' }))
        .toHaveAttribute('href', 'https://kinggizzard.bandcamp.com/album/nonagon-infinity');
      expect(screen.getByRole('link', { name: 'Spotify' }))
        .toHaveAttribute('href', 'https://open.spotify.com/album/nonagon');
      expect(screen.getByRole('link', { name: 'YouTube' }))
        .toHaveAttribute('href', 'https://youtube.com/watch?v=nonagon');
    });

    it('should handle single link', () => {
      const singleLink = [
        { href: 'https://spotify.com/album/123', label: 'Spotify' },
      ];
      
      render(<IndividualLinks links={singleLink} />);
      
      expect(screen.getByRole('link', { name: 'Spotify' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Bandcamp' })).not.toBeInTheDocument();
    });

    it('should handle empty links array', () => {
      const { container } = render(<IndividualLinks links={[]} />);
      
      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelectorAll('li')).toHaveLength(0);
    });
  });

  describe('Link Behavior', () => {
    it('should open links in new tab', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });

    it('should include security attributes for external links', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Styling', () => {
    it('should style links as buttons', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const link = screen.getByRole('link', { name: 'Bandcamp' });
      
      // Button-like styling
      expect(link.className).toContain('inline-block');
      expect(link.className).toContain('bg-yellow-500');
      expect(link.className).toContain('text-black');
      expect(link.className).toContain('font-bold');
      expect(link.className).toContain('py-2');
      expect(link.className).toContain('px-4');
      expect(link.className).toContain('rounded');
    });

    it('should have hover effects', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const link = screen.getByRole('link', { name: 'Spotify' });
      expect(link.className).toContain('hover:bg-yellow-600');
    });

    it('should have transition effects', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const link = screen.getByRole('link', { name: 'YouTube' });
      expect(link.className).toContain('transition');
      expect(link.className).toContain('duration-200');
    });
  });

  describe('Layout', () => {
    it('should display links in a horizontal list', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const list = screen.getByRole('list');
      expect(list.className).toContain('flex');
      expect(list.className).toContain('space-x-4');
    });

    it('should center the list', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const list = screen.getByRole('list');
      expect(list.className).toContain('justify-center');
    });

    it('should add margin to the container', () => {
      const { container } = render(<IndividualLinks links={defaultLinks} />);
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('mt-8');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic list structure', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const list = screen.getByRole('list');
      const items = screen.getAllByRole('listitem');
      
      expect(list).toBeInTheDocument();
      expect(items).toHaveLength(3);
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<IndividualLinks links={defaultLinks} />);
      
      // Tab through links
      await user.tab();
      expect(screen.getByRole('link', { name: 'Bandcamp' })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: 'Spotify' })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: 'YouTube' })).toHaveFocus();
    });

    it('should have descriptive link text', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      // Each link should clearly indicate the service
      expect(screen.getByText('Bandcamp')).toBeInTheDocument();
      expect(screen.getByText('Spotify')).toBeInTheDocument();
      expect(screen.getByText('YouTube')).toBeInTheDocument();
    });
  });

  describe('Different Link Combinations', () => {
    it('should handle Bandcamp only', () => {
      const bandcampOnly = [
        { href: 'https://band.camp/album', label: 'Bandcamp' },
      ];
      
      render(<IndividualLinks links={bandcampOnly} />);
      
      expect(screen.getByRole('link', { name: 'Bandcamp' })).toBeInTheDocument();
      expect(screen.getAllByRole('link')).toHaveLength(1);
    });

    it('should handle Spotify and YouTube only', () => {
      const spotifyYouTube = [
        { href: 'https://spotify.com', label: 'Spotify' },
        { href: 'https://youtube.com', label: 'YouTube' },
      ];
      
      render(<IndividualLinks links={spotifyYouTube} />);
      
      expect(screen.getByRole('link', { name: 'Spotify' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'YouTube' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Bandcamp' })).not.toBeInTheDocument();
    });

    it('should handle custom link labels', () => {
      const customLinks = [
        { href: 'https://music.apple.com', label: 'Apple Music' },
        { href: 'https://tidal.com', label: 'Tidal' },
      ];
      
      render(<IndividualLinks links={customLinks} />);
      
      expect(screen.getByRole('link', { name: 'Apple Music' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Tidal' })).toBeInTheDocument();
    });
  });

  describe('Link Order', () => {
    it('should maintain the order of links as provided', () => {
      render(<IndividualLinks links={defaultLinks} />);
      
      const links = screen.getAllByRole('link');
      
      expect(links[0]).toHaveTextContent('Bandcamp');
      expect(links[1]).toHaveTextContent('Spotify');
      expect(links[2]).toHaveTextContent('YouTube');
    });

    it('should handle reordered links', () => {
      const reorderedLinks = [
        { href: 'https://youtube.com', label: 'YouTube' },
        { href: 'https://bandcamp.com', label: 'Bandcamp' },
        { href: 'https://spotify.com', label: 'Spotify' },
      ];
      
      render(<IndividualLinks links={reorderedLinks} />);
      
      const links = screen.getAllByRole('link');
      
      expect(links[0]).toHaveTextContent('YouTube');
      expect(links[1]).toHaveTextContent('Bandcamp');
      expect(links[2]).toHaveTextContent('Spotify');
    });
  });

  describe('URL Validation', () => {
    it('should render any valid URL', () => {
      const variousLinks = [
        { href: 'https://example.com', label: 'Example' },
        { href: 'http://insecure.com', label: 'HTTP Link' },
        { href: 'https://sub.domain.com/path/to/page', label: 'Complex URL' },
      ];
      
      render(<IndividualLinks links={variousLinks} />);
      
      expect(screen.getByRole('link', { name: 'Example' }))
        .toHaveAttribute('href', 'https://example.com');
      expect(screen.getByRole('link', { name: 'HTTP Link' }))
        .toHaveAttribute('href', 'http://insecure.com');
      expect(screen.getByRole('link', { name: 'Complex URL' }))
        .toHaveAttribute('href', 'https://sub.domain.com/path/to/page');
    });
  });

  describe('Integration with Album Component', () => {
    it('should work with typical album streaming links', () => {
      const albumLinks = [
        { 
          href: 'https://kinggizzard.bandcamp.com/album/flying-microtonal-banana', 
          label: 'Bandcamp' 
        },
        { 
          href: 'https://open.spotify.com/album/2eUigDDUXXP5kn6jBMmQVB', 
          label: 'Spotify' 
        },
        { 
          href: 'https://www.youtube.com/playlist?list=OLAK5uy_lCF6tpJLfIsW0EL-d0XTQKt8BkV0LXyAI', 
          label: 'YouTube' 
        },
      ];
      
      render(<IndividualLinks links={albumLinks} />);
      
      // All streaming service links should be present
      expect(screen.getByRole('link', { name: 'Bandcamp' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Spotify' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'YouTube' })).toBeInTheDocument();
    });
  });
});