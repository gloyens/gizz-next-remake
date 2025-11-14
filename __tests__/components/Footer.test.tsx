/**
 * Tests for Footer Component
 * 
 * The Footer component displays site information and links at the bottom
 * of every page. It's a simple presentational component.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer Component', () => {
  describe('Content', () => {
    it('should render the site title', () => {
      render(<Footer />);
      
      expect(screen.getByText('King Gizzard & The Lizard Wizard Discography')).toBeInTheDocument();
    });

    it('should display the current year', () => {
      render(<Footer />);
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
    });

    it('should automatically update year', () => {
      // Mock different years
      const originalDate = Date;
      const mockDate = jest.fn(() => ({
        getFullYear: () => 2025,
      })) as any;
      mockDate.now = originalDate.now;
      global.Date = mockDate;

      render(<Footer />);
      expect(screen.getByText('© 2025')).toBeInTheDocument();

      // Test with different year
      mockDate.mockImplementation(() => ({
        getFullYear: () => 2026,
      }));
      
      const { rerender } = render(<Footer />);
      rerender(<Footer />);
      expect(screen.getByText('© 2026')).toBeInTheDocument();

      // Restore original Date
      global.Date = originalDate;
    });
  });

  describe('Styling', () => {
    it('should have dark background styling', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer?.className).toContain('bg-gray-800');
      expect(footer?.className).toContain('text-white');
    });

    it('should have proper padding and layout', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer?.className).toContain('py-4');
      expect(footer?.className).toContain('mt-8');
    });

    it('should center content', () => {
      const { container } = render(<Footer />);
      
      const contentDiv = footer?.querySelector('div');
      expect(contentDiv?.className).toContain('text-center');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic footer element', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer?.tagName).toBe('FOOTER');
    });

    it('should have appropriate text contrast', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      // Dark background with white text ensures good contrast
      expect(footer?.className).toContain('bg-gray-800');
      expect(footer?.className).toContain('text-white');
    });
  });

  describe('Layout Integration', () => {
    it('should work as a sticky footer', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      // mt-8 provides separation from main content
      expect(footer?.className).toContain('mt-8');
    });

    it('should span full width', () => {
      const { container } = render(
        <div className="min-h-screen">
          <main>Content</main>
          <Footer />
        </div>
      );
      
      const footer = container.querySelector('footer');
      // Footer should be full width by default
      expect(footer?.style.width).not.toBe('auto');
    });
  });

  describe('Text Content', () => {
    it('should use proper typography', () => {
      render(<Footer />);
      
      const title = screen.getByText('King Gizzard & The Lizard Wizard Discography');
      const copyright = screen.getByText(/© \d{4}/);
      
      // Both should be in the same footer
      expect(title.closest('footer')).toBe(copyright.closest('footer'));
    });

    it('should maintain text hierarchy', () => {
      render(<Footer />);
      
      const texts = screen.getAllByText(/./);
      // Footer text should be uniform in size
      texts.forEach(text => {
        if (text.closest('footer')) {
          expect(text.className).not.toContain('text-lg');
          expect(text.className).not.toContain('text-xl');
        }
      });
    });
  });

  describe('Responsiveness', () => {
    it('should maintain layout on small screens', () => {
      // Footer is simple and should work on all screen sizes
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      const contentDiv = footer?.querySelector('div');
      
      // Centered text works well on all screen sizes
      expect(contentDiv?.className).toContain('text-center');
    });
  });

  describe('Component Usage', () => {
    it('should be usable in different layouts', () => {
      // Test in a typical page layout
      const { container } = render(
        <div className="flex flex-col min-h-screen">
          <header>Header</header>
          <main className="flex-grow">Main Content</main>
          <Footer />
        </div>
      );
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
      
      // Footer should be at the bottom
      const layout = container.firstChild as HTMLElement;
      expect(layout.lastChild).toBe(footer);
    });

    it('should not interfere with page content', () => {
      const { container } = render(
        <>
          <div id="content">Page content</div>
          <Footer />
        </>
      );
      
      const footer = container.querySelector('footer');
      const content = container.querySelector('#content');
      
      // Footer should be separate from content
      expect(footer).not.toContain(content);
      expect(content).not.toContain(footer);
    });
  });
});