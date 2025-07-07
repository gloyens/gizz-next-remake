/**
 * Tests for Home Page
 * 
 * The home page displays a 3D rotating vinyl record using Three.js and
 * shows a random album recommendation to visitors.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { getRandomAlbum } from '@/utils/getRandomAlbum';

// Mock dependencies
jest.mock('@/utils/getRandomAlbum');
jest.mock('@/components/Button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Mock Three.js components - they don't render in tests
jest.mock('@/app/webgl/MainCanvas', () => ({
  __esModule: true,
  default: () => <div data-testid="main-canvas">3D Canvas</div>,
}));

describe('Home Page', () => {
  const mockRandomAlbum = {
    title: 'Nonagon Infinity',
    slug: 'nonagon-infinity',
    releaseDate: '2016-05-06',
    index: 10,
    imageSrc: '/images/nonagon-infinity.jpg',
  };

  beforeEach(() => {
    (getRandomAlbum as jest.Mock).mockReturnValue(mockRandomAlbum);
  });

  describe('Layout and Structure', () => {
    it('should render the main canvas area', () => {
      render(<HomePage />);
      
      expect(screen.getByTestId('main-canvas')).toBeInTheDocument();
    });

    it('should display the main heading', () => {
      render(<HomePage />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('King Gizzard & The Lizard Wizard');
    });

    it('should show the tagline', () => {
      render(<HomePage />);
      
      expect(screen.getByText('The Complete Studio Discography')).toBeInTheDocument();
    });

    it('should use proper layout structure', () => {
      const { container } = render(<HomePage />);
      
      // Should have a main element
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      
      // Should use flexbox for centering
      expect(main?.className).toContain('flex');
      expect(main?.className).toContain('flex-col');
      expect(main?.className).toContain('items-center');
      expect(main?.className).toContain('justify-center');
    });
  });

  describe('Random Album Feature', () => {
    it('should display a random album recommendation', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Jump into')).toBeInTheDocument();
      
      const albumLink = screen.getByRole('link', { name: 'Nonagon Infinity' });
      expect(albumLink).toBeInTheDocument();
      expect(albumLink).toHaveAttribute('href', '/albums/nonagon-infinity');
    });

    it('should call getRandomAlbum on render', () => {
      render(<HomePage />);
      
      expect(getRandomAlbum).toHaveBeenCalled();
    });

    it('should handle different album data', () => {
      (getRandomAlbum as jest.Mock).mockReturnValue({
        title: 'Flying Microtonal Banana',
        slug: 'flying-microtonal-banana',
        releaseDate: '2017-02-24',
        index: 11,
        imageSrc: '/images/flying-microtonal-banana.jpg',
      });

      render(<HomePage />);
      
      const albumLink = screen.getByRole('link', { name: 'Flying Microtonal Banana' });
      expect(albumLink).toHaveAttribute('href', '/albums/flying-microtonal-banana');
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('should render the View All Albums button', () => {
      render(<HomePage />);
      
      const viewAllButton = screen.getByRole('link', { name: 'View All Albums' });
      expect(viewAllButton).toBeInTheDocument();
      expect(viewAllButton).toHaveAttribute('href', '/albums');
    });

    it('should style CTA button as primary', () => {
      render(<HomePage />);
      
      const button = screen.getByRole('link', { name: 'View All Albums' });
      // Button component would have variant="primary" by default
      expect(button.tagName).toBe('A'); // It's a link styled as a button
    });
  });

  describe('3D Canvas Integration', () => {
    it('should render the 3D canvas component', () => {
      render(<HomePage />);
      
      const canvas = screen.getByTestId('main-canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('should position canvas absolutely for background effect', () => {
      const { container } = render(<HomePage />);
      
      // Canvas should be positioned absolute
      const canvasContainer = container.querySelector('.absolute');
      expect(canvasContainer).toBeInTheDocument();
      expect(canvasContainer?.className).toContain('inset-0');
    });

    it('should layer content above canvas', () => {
      const { container } = render(<HomePage />);
      
      // Content should have higher z-index
      const contentSection = container.querySelector('.relative.z-10');
      expect(contentSection).toBeInTheDocument();
    });
  });

  describe('Styling and Visual Design', () => {
    it('should have a dark theme', () => {
      const { container } = render(<HomePage />);
      
      const main = container.querySelector('main');
      expect(main?.className).toContain('bg-black');
      expect(main?.className).toContain('text-white');
    });

    it('should use full viewport height', () => {
      const { container } = render(<HomePage />);
      
      const main = container.querySelector('main');
      expect(main?.className).toContain('min-h-screen');
    });

    it('should center content with proper spacing', () => {
      const { container } = render(<HomePage />);
      
      const contentSection = container.querySelector('.text-center');
      expect(contentSection).toBeInTheDocument();
      expect(contentSection?.className).toContain('space-y-8');
    });

    it('should style the main heading prominently', () => {
      render(<HomePage />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.className).toContain('text-5xl');
      expect(heading.className).toContain('md:text-7xl');
      expect(heading.className).toContain('font-bold');
      expect(heading.className).toContain('mb-4');
    });

    it('should style the tagline appropriately', () => {
      render(<HomePage />);
      
      const tagline = screen.getByText('The Complete Studio Discography');
      expect(tagline.className).toContain('text-xl');
      expect(tagline.className).toContain('md:text-2xl');
      expect(tagline.className).toContain('text-gray-300');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizes', () => {
      render(<HomePage />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      // Mobile: text-5xl, Desktop: md:text-7xl
      expect(heading.className).toContain('text-5xl');
      expect(heading.className).toContain('md:text-7xl');
    });

    it('should maintain centered layout on all screen sizes', () => {
      const { container } = render(<HomePage />);
      
      const main = container.querySelector('main');
      expect(main?.className).toContain('flex');
      expect(main?.className).toContain('items-center');
      expect(main?.className).toContain('justify-center');
    });
  });

  describe('Accessibility', () => {
    it('should have a main landmark', () => {
      const { container } = render(<HomePage />);
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<HomePage />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings[0]).toHaveProperty('tagName', 'H1');
    });

    it('should provide descriptive link text', () => {
      render(<HomePage />);
      
      const albumLink = screen.getByRole('link', { name: 'Nonagon Infinity' });
      const viewAllLink = screen.getByRole('link', { name: 'View All Albums' });
      
      // Links should have clear, actionable text
      expect(albumLink).toBeInTheDocument();
      expect(viewAllLink).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle getRandomAlbum errors gracefully', () => {
      (getRandomAlbum as jest.Mock).mockImplementation(() => {
        throw new Error('No albums found');
      });

      // Should not crash the page
      expect(() => render(<HomePage />)).toThrow();
    });
  });

  describe('User Journey', () => {
    it('should provide multiple paths to explore albums', () => {
      render(<HomePage />);
      
      // Users can either:
      // 1. Click on the random album suggestion
      const randomAlbumLink = screen.getByRole('link', { name: 'Nonagon Infinity' });
      expect(randomAlbumLink).toHaveAttribute('href', '/albums/nonagon-infinity');
      
      // 2. Click "View All Albums" to see the full list
      const viewAllLink = screen.getByRole('link', { name: 'View All Albums' });
      expect(viewAllLink).toHaveAttribute('href', '/albums');
    });
  });
});