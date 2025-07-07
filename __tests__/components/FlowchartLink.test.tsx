/**
 * Tests for FlowchartLink Component
 * 
 * FlowchartLink is used to display album links in a visual flowchart style.
 * Each link shows the album cover image and title, and navigates to the
 * album's detail page when clicked.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlowchartLink } from '@/components/FlowchartLink';
import { useRouter } from 'next/navigation';

// Mock Next.js navigation
jest.mock('next/navigation');

describe('FlowchartLink Component', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  const defaultProps = {
    imageSrc: '/images/nonagon-infinity.jpg',
    albumName: 'Nonagon Infinity',
  };

  describe('Rendering', () => {
    it('should render album image with correct src and alt text', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/images/nonagon-infinity.jpg');
      expect(image).toHaveAttribute('alt', 'Nonagon Infinity');
    });

    it('should render album name as heading', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Nonagon Infinity');
    });

    it('should apply proper styling classes', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const container = screen.getByRole('img').closest('div');
      expect(container?.className).toContain('text-center');
      expect(container?.className).toContain('cursor-pointer');
    });

    it('should handle long album names gracefully', () => {
      const longName = 'Paper Mâché Dream Balloon (Deluxe Edition with Bonus Tracks)';
      render(<FlowchartLink imageSrc="/test.jpg" albumName={longName} />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent(longName);
      expect(heading.className).toContain('text-sm');
    });
  });

  describe('Navigation', () => {
    it('should navigate to album page on click using kebabified slug', async () => {
      const user = userEvent.setup();
      
      render(<FlowchartLink {...defaultProps} />);
      
      const clickableArea = screen.getByRole('img').closest('div');
      await user.click(clickableArea!);
      
      // Should navigate to kebabified URL
      expect(mockPush).toHaveBeenCalledWith('/albums/nonagon-infinity');
    });

    it('should correctly kebabify complex album names', async () => {
      const user = userEvent.setup();
      
      const testCases = [
        { name: "I'm In Your Mind Fuzz", expectedSlug: 'im-in-your-mind-fuzz' },
        { name: 'Float Along - Fill Your Lungs', expectedSlug: 'float-along-fill-your-lungs' },
        { name: 'Paper Mâché Dream Balloon', expectedSlug: 'paper-mache-dream-balloon' },
        { name: 'K.G.', expectedSlug: 'kg' },
        { name: 'Quarters!', expectedSlug: 'quarters' },
      ];
      
      for (const testCase of testCases) {
        const { rerender } = render(
          <FlowchartLink imageSrc="/test.jpg" albumName={testCase.name} />
        );
        
        const clickableArea = screen.getByRole('img').closest('div');
        await user.click(clickableArea!);
        
        expect(mockPush).toHaveBeenLastCalledWith(`/albums/${testCase.expectedSlug}`);
        
        rerender(<></>); // Clear for next iteration
      }
    });
  });

  describe('Image Loading', () => {
    it('should use Next.js Image component features', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const image = screen.getByRole('img');
      
      // Next.js Image component should have width and height
      expect(image).toHaveAttribute('width', '200');
      expect(image).toHaveAttribute('height', '200');
    });

    it('should maintain aspect ratio for album covers', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const imageContainer = screen.getByRole('img').parentElement;
      expect(imageContainer?.className).toContain('w-48');
      expect(imageContainer?.className).toContain('h-48');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      
      render(<FlowchartLink {...defaultProps} />);
      
      // Tab to the link
      await user.tab();
      
      // The clickable div should be focused
      const clickableArea = screen.getByRole('img').closest('div');
      expect(clickableArea).toHaveFocus();
      
      // Enter should trigger navigation
      await user.keyboard('{Enter}');
      expect(mockPush).toHaveBeenCalledWith('/albums/nonagon-infinity');
    });

    it('should have appropriate ARIA attributes', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const clickableArea = screen.getByRole('img').closest('div');
      // Should indicate it's interactive
      expect(clickableArea).toHaveAttribute('tabIndex', '0');
    });

    it('should provide context through image alt text', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Nonagon Infinity');
    });
  });

  describe('Hover and Interaction States', () => {
    it('should have hover styles', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const container = screen.getByRole('img').closest('div');
      expect(container?.className).toContain('hover:opacity-75');
    });

    it('should show cursor pointer on hover', () => {
      render(<FlowchartLink {...defaultProps} />);
      
      const container = screen.getByRole('img').closest('div');
      expect(container?.className).toContain('cursor-pointer');
    });
  });

  describe('Integration with Album Data', () => {
    it('should handle missing image gracefully', () => {
      // When image fails to load, Next.js Image has fallback behavior
      render(<FlowchartLink imageSrc="" albumName="No Image Album" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '');
      expect(image).toHaveAttribute('alt', 'No Image Album');
    });

    it('should work with various image formats', () => {
      const imageFormats = [
        '/images/album.jpg',
        '/images/album.png',
        '/images/album.webp',
        '/images/album.jpeg',
      ];
      
      imageFormats.forEach(src => {
        const { rerender } = render(
          <FlowchartLink imageSrc={src} albumName="Test Album" />
        );
        
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', src);
        
        rerender(<></>);
      });
    });
  });

  describe('Usage in FlowchartLinks Container', () => {
    it('should be styled for grid layout', () => {
      // FlowchartLink is designed to work in a grid
      render(
        <div className="grid grid-cols-3 gap-4">
          <FlowchartLink imageSrc="/1.jpg" albumName="Album 1" />
          <FlowchartLink imageSrc="/2.jpg" albumName="Album 2" />
          <FlowchartLink imageSrc="/3.jpg" albumName="Album 3" />
        </div>
      );
      
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });
  });
});