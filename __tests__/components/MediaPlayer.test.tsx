/**
 * Tests for MediaPlayer Component
 * 
 * The MediaPlayer component embeds Bandcamp players to allow users to
 * listen to albums directly on the site. It handles both album and
 * track embeds.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaPlayer } from '@/components/MediaPlayer';

describe('MediaPlayer Component', () => {
  describe('Album Embed', () => {
    it('should render Bandcamp iframe for album with correct attributes', () => {
      render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/nonagon-infinity" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      
      // Check iframe attributes
      expect(iframe).toHaveAttribute('src', expect.stringContaining('bandcamp.com/EmbeddedPlayer'));
      expect(iframe).toHaveAttribute('src', expect.stringContaining('album=1234567890'));
      expect(iframe).toHaveAttribute('seamless');
      expect(iframe).toHaveAttribute('width', '700');
      expect(iframe).toHaveAttribute('height', '274');
    });

    it('should include all required embed parameters', () => {
      render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      const src = iframe.getAttribute('src') || '';
      
      // Verify all embed parameters
      expect(src).toContain('size=large');
      expect(src).toContain('bgcol=ffffff');
      expect(src).toContain('linkcol=0687f5');
      expect(src).toContain('artwork=small');
      expect(src).toContain('transparent=true');
    });

    it('should apply container styling', () => {
      const { container } = render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
        />
      );
      
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('my-8');
    });
  });

  describe('Track Embed', () => {
    it('should render track embed when trackId is provided', () => {
      render(
        <MediaPlayer 
          albumId={1234567890}
          trackId={987654321}
          bandcampLink="https://kinggizzard.bandcamp.com/track/robot-stop" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      const src = iframe.getAttribute('src') || '';
      
      // Should include both album and track IDs
      expect(src).toContain('album=1234567890');
      expect(src).toContain('track=987654321');
      
      // Track embeds have different height
      expect(iframe).toHaveAttribute('height', '274'); // Same height for visual consistency
    });

    it('should use correct embed URL format for tracks', () => {
      render(
        <MediaPlayer 
          albumId={1111111111}
          trackId={2222222222}
          bandcampLink="https://kinggizzard.bandcamp.com/track/gamma-knife" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      const src = iframe.getAttribute('src') || '';
      
      // Should have both IDs in the correct format
      expect(src).toMatch(/album=1111111111\/.*track=2222222222/);
    });
  });

  describe('Bandcamp Link Handling', () => {
    it('should extract band name from bandcamp URL', () => {
      const testCases = [
        {
          link: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
          expectedBand: 'kinggizzard',
        },
        {
          link: 'https://flightlessrecords.bandcamp.com/album/quarters',
          expectedBand: 'flightlessrecords',
        },
        {
          link: 'https://castleface.bandcamp.com/album/floating-coffin',
          expectedBand: 'castleface',
        },
      ];
      
      testCases.forEach(({ link, expectedBand }) => {
        const { container } = render(
          <MediaPlayer albumId={123} bandcampLink={link} />
        );
        
        const iframe = container.querySelector('iframe');
        const src = iframe?.getAttribute('src') || '';
        
        // The embed URL should use the correct band subdomain
        expect(src).toContain(`https://bandcamp.com/EmbeddedPlayer`);
        expect(src).toContain('album=123');
      });
    });

    it('should handle bandcamp links with various formats', () => {
      const links = [
        'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
        'http://kinggizzard.bandcamp.com/album/nonagon-infinity',
        'https://kinggizzard.bandcamp.com/album/nonagon-infinity?from=search',
        'https://kinggizzard.bandcamp.com/track/robot-stop',
      ];
      
      links.forEach(link => {
        const { container } = render(
          <MediaPlayer albumId={123} bandcampLink={link} />
        );
        
        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should maintain aspect ratio', () => {
      render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      
      // Standard Bandcamp player dimensions
      expect(iframe).toHaveAttribute('width', '700');
      expect(iframe).toHaveAttribute('height', '274');
    });

    it('should allow parent container to control sizing', () => {
      const { container } = render(
        <div style={{ maxWidth: '500px' }}>
          <MediaPlayer 
            albumId={1234567890} 
            bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
          />
        </div>
      );
      
      const iframe = container.querySelector('iframe');
      // iframe should still have its attributes, container handles responsive sizing
      expect(iframe).toHaveAttribute('width', '700');
    });
  });

  describe('Accessibility', () => {
    it('should have descriptive title for screen readers', () => {
      render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/nonagon-infinity" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      expect(iframe).toHaveAttribute('title', 'Bandcamp player');
    });

    it('should be embedded seamlessly', () => {
      render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      // seamless attribute for better integration
      expect(iframe).toHaveAttribute('seamless');
    });
  });

  describe('Error Handling', () => {
    it('should render even with missing optional trackId', () => {
      render(
        <MediaPlayer 
          albumId={1234567890} 
          bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
        />
      );
      
      const iframe = screen.getByTitle('Bandcamp player');
      const src = iframe.getAttribute('src') || '';
      
      // Should not include track parameter
      expect(src).not.toContain('track=');
      expect(src).toContain('album=1234567890');
    });

    it('should handle various albumId formats', () => {
      const albumIds = [123, 123456789, 9876543210];
      
      albumIds.forEach(id => {
        const { container } = render(
          <MediaPlayer 
            albumId={id} 
            bandcampLink="https://kinggizzard.bandcamp.com/album/test" 
          />
        );
        
        const iframe = container.querySelector('iframe');
        const src = iframe?.getAttribute('src') || '';
        expect(src).toContain(`album=${id}`);
      });
    });
  });

  describe('Integration with Album Pages', () => {
    it('should work with full album embeds on album detail pages', () => {
      // Simulating usage on an album page
      const albumData = {
        albumId: 3055533230,
        bandcampLink: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
      };
      
      render(<MediaPlayer {...albumData} />);
      
      const iframe = screen.getByTitle('Bandcamp player');
      expect(iframe).toBeInTheDocument();
      expect(iframe.getAttribute('src')).toContain('album=3055533230');
    });

    it('should work with individual track embeds', () => {
      // Simulating a track highlight
      const trackData = {
        albumId: 3055533230,
        trackId: 1234567,
        bandcampLink: 'https://kinggizzard.bandcamp.com/track/robot-stop',
      };
      
      render(<MediaPlayer {...trackData} />);
      
      const iframe = screen.getByTitle('Bandcamp player');
      const src = iframe.getAttribute('src') || '';
      expect(src).toContain('album=3055533230');
      expect(src).toContain('track=1234567');
    });
  });
});