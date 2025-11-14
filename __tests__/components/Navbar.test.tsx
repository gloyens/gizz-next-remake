/**
 * Tests for Navbar Component
 * 
 * The Navbar provides site navigation and is displayed at the top of every page.
 * It includes links to the home page and albums listing.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/components/Navbar';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Navbar Component', () => {
  describe('Rendering', () => {
    it('should render the site title as a link to home', () => {
      render(<Navbar />);
      
      const homeLink = screen.getByRole('link', { name: /Gizz/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should render the Albums link', () => {
      render(<Navbar />);
      
      const albumsLink = screen.getByRole('link', { name: 'Albums' });
      expect(albumsLink).toBeInTheDocument();
      expect(albumsLink).toHaveAttribute('href', '/albums');
    });

    it('should use semantic nav element', () => {
      const { container } = render(<Navbar />);
      
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have dark theme styling', () => {
      const { container } = render(<Navbar />);
      
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('bg-black');
      expect(nav?.className).toContain('text-white');
    });

    it('should have proper padding', () => {
      const { container } = render(<Navbar />);
      
      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('p-4');
    });

    it('should use flexbox for layout', () => {
      render(<Navbar />);
      
      const container = screen.getByRole('navigation').querySelector('div');
      expect(container?.className).toContain('flex');
      expect(container?.className).toContain('justify-between');
      expect(container?.className).toContain('items-center');
    });

    it('should constrain width with max-width', () => {
      render(<Navbar />);
      
      const container = screen.getByRole('navigation').querySelector('div');
      expect(container?.className).toContain('max-w-6xl');
      expect(container?.className).toContain('mx-auto');
    });
  });

  describe('Typography', () => {
    it('should style the home link as a logo', () => {
      render(<Navbar />);
      
      const homeLink = screen.getByRole('link', { name: /Gizz/i });
      expect(homeLink.className).toContain('text-2xl');
      expect(homeLink.className).toContain('font-bold');
    });

    it('should style navigation links consistently', () => {
      render(<Navbar />);
      
      const albumsLink = screen.getByRole('link', { name: 'Albums' });
      expect(albumsLink.className).toContain('hover:underline');
    });
  });

  describe('Navigation Structure', () => {
    it('should separate brand and navigation links', () => {
      render(<Navbar />);
      
      // Get the flex container
      const container = screen.getByRole('navigation').querySelector('.flex');
      const children = container?.children;
      
      expect(children).toHaveLength(2); // Brand section and nav links section
      
      // First child should contain the home link
      const brandSection = children?.[0];
      expect(brandSection).toContainElement(screen.getByRole('link', { name: /Gizz/i }));
      
      // Second child should contain navigation links
      const navSection = children?.[1];
      expect(navSection).toContainElement(screen.getByRole('link', { name: 'Albums' }));
    });

    it('should use a list for navigation links', () => {
      render(<Navbar />);
      
      const navList = screen.getByRole('list');
      expect(navList).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1); // Currently just Albums link
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      // Tab through links
      await user.tab();
      expect(screen.getByRole('link', { name: /Gizz/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: 'Albums' })).toHaveFocus();
    });

    it('should have proper link text for screen readers', () => {
      render(<Navbar />);
      
      const homeLink = screen.getByRole('link', { name: /Gizz/i });
      const albumsLink = screen.getByRole('link', { name: 'Albums' });
      
      // Links should have clear, descriptive text
      expect(homeLink).toHaveTextContent('Gizz');
      expect(albumsLink).toHaveTextContent('Albums');
    });

    it('should use semantic HTML structure', () => {
      const { container } = render(<Navbar />);
      
      // Should use nav element
      expect(container.querySelector('nav')).toBeInTheDocument();
      
      // Should use list for navigation items
      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelectorAll('li')).toHaveLength(1);
    });
  });

  describe('Responsive Design', () => {
    it('should maintain layout on small screens', () => {
      render(<Navbar />);
      
      const container = screen.getByRole('navigation').querySelector('.flex');
      
      // Flexbox with justify-between works well on all screen sizes
      expect(container?.className).toContain('justify-between');
      expect(container?.className).toContain('items-center');
    });

    it('should have appropriate spacing', () => {
      render(<Navbar />);
      
      const navList = screen.getByRole('list');
      
      // List items should have spacing
      expect(navList.className).toContain('space-x-4');
    });
  });

  describe('Link Behavior', () => {
    it('should use Next.js Link for client-side navigation', () => {
      render(<Navbar />);
      
      // All navigation should use Link components (mocked as <a> tags in tests)
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href');
      });
    });

    it('should highlight interactive elements on hover', () => {
      render(<Navbar />);
      
      const albumsLink = screen.getByRole('link', { name: 'Albums' });
      
      // Should have hover styles
      expect(albumsLink.className).toContain('hover:underline');
    });
  });

  describe('Integration with Layout', () => {
    it('should work as a fixed header', () => {
      const { container } = render(
        <div>
          <Navbar />
          <main>Content</main>
        </div>
      );
      
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      
      // Navbar should be the first element
      expect(container.firstChild?.firstChild).toBe(nav);
    });

    it('should provide consistent branding across pages', () => {
      render(<Navbar />);
      
      const brandLink = screen.getByRole('link', { name: /Gizz/i });
      
      // Brand should always link to home
      expect(brandLink).toHaveAttribute('href', '/');
      
      // Brand should be prominent
      expect(brandLink.className).toContain('text-2xl');
      expect(brandLink.className).toContain('font-bold');
    });
  });

  describe('Future Extensibility', () => {
    it('should support adding more navigation items', () => {
      // The current structure with ul/li makes it easy to add more links
      render(<Navbar />);
      
      const navList = screen.getByRole('list');
      
      // Structure supports multiple items
      expect(navList.tagName).toBe('UL');
      expect(navList.className).toContain('flex');
      expect(navList.className).toContain('space-x-4');
    });
  });
});