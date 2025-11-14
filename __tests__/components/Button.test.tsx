/**
 * Tests for Button Component
 * 
 * The Button component is a reusable UI component that supports different
 * visual variants. It's used throughout the application for navigation
 * and actions.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  describe('Rendering and Content', () => {
    it('should render with children text', () => {
      render(<Button>Click Me</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should render with complex children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Variants and Styling', () => {
    it('should apply primary variant styles by default', () => {
      render(<Button>Primary Button</Button>);
      
      const button = screen.getByRole('button');
      // Primary variant typically has specific classes
      expect(button.className).toContain('bg-yellow-300');
      expect(button.className).toContain('text-black');
    });

    it('should apply secondary variant styles when specified', () => {
      render(<Button variant="secondary">Secondary Button</Button>);
      
      const button = screen.getByRole('button');
      // Secondary variant has different styling
      expect(button.className).toContain('bg-transparent');
      expect(button.className).toContain('text-yellow-300');
      expect(button.className).toContain('border-yellow-300');
    });

    it('should apply common styles regardless of variant', () => {
      const { rerender } = render(<Button>Button</Button>);
      let button = screen.getByRole('button');
      
      // Common styles that should be present
      expect(button.className).toContain('font-bold');
      expect(button.className).toContain('py-2');
      expect(button.className).toContain('px-4');
      expect(button.className).toContain('rounded');
      
      // Should maintain common styles with secondary variant
      rerender(<Button variant="secondary">Button</Button>);
      button = screen.getByRole('button');
      
      expect(button.className).toContain('font-bold');
      expect(button.className).toContain('py-2');
      expect(button.className).toContain('px-4');
      expect(button.className).toContain('rounded');
    });
  });

  describe('Props and Behavior', () => {
    it('should pass through HTML button attributes', () => {
      render(
        <Button 
          disabled
          type="submit"
          aria-label="Submit form"
          data-testid="custom-button"
        >
          Submit
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-label', 'Submit form');
      expect(button).toHaveAttribute('data-testid', 'custom-button');
    });

    it('should handle onClick events', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not trigger onClick when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Button onClick={handleClick} disabled>
          Disabled Button
        </Button>
      );
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should apply custom className', () => {
      render(
        <Button className="custom-class additional-class">
          Custom Styled
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
      expect(button.className).toContain('additional-class');
      // Should still have base button styles
      expect(button.className).toContain('font-bold');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard Test</Button>);
      
      const button = screen.getByRole('button');
      
      // Tab to button
      await user.tab();
      expect(button).toHaveFocus();
      
      // Press Enter
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Press Space
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('should have proper ARIA attributes', () => {
      render(
        <Button aria-pressed="true" aria-describedby="help-text">
          Toggle Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });
  });

  describe('Integration Examples', () => {
    it('should work as a navigation button', () => {
      // Example of how Button is used for navigation
      const navigate = jest.fn();
      
      render(
        <Button onClick={() => navigate('/albums')}>
          View All Albums
        </Button>
      );
      
      const button = screen.getByText('View All Albums');
      expect(button).toBeInTheDocument();
    });

    it('should work in a form context', () => {
      // Example of Button in a form
      const handleSubmit = jest.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <input type="text" name="album" />
          <Button type="submit">Add Album</Button>
        </form>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should support different button types for various actions', () => {
      // Demonstrating the two variants for different use cases
      render(
        <div>
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
        </div>
      );
      
      const primaryButton = screen.getByText('Primary Action');
      const secondaryButton = screen.getByText('Secondary Action');
      
      // Primary for main CTAs
      expect(primaryButton.className).toContain('bg-yellow-300');
      
      // Secondary for less prominent actions
      expect(secondaryButton.className).toContain('border-yellow-300');
    });
  });
});