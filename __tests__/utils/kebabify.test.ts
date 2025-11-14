/**
 * Tests for Kebabify Utility
 * 
 * The kebabify function converts album titles and other strings into URL-safe slugs.
 * This is essential for creating clean URLs for album pages and navigation.
 * 
 * Example: "Flying Microtonal Banana" -> "flying-microtonal-banana"
 */

import { kebabify } from '@/utils/kebabify';

describe('kebabify', () => {
  describe('Basic string transformations', () => {
    it('should convert simple strings to lowercase kebab-case', () => {
      expect(kebabify('Hello World')).toBe('hello-world');
      expect(kebabify('King Gizzard')).toBe('king-gizzard');
    });

    it('should handle single words by converting to lowercase', () => {
      expect(kebabify('Album')).toBe('album');
      expect(kebabify('NONAGON')).toBe('nonagon');
    });

    it('should convert multiple spaces to single hyphens', () => {
      expect(kebabify('Hello   World')).toBe('hello-world');
      expect(kebabify('Too  Many    Spaces')).toBe('too-many-spaces');
    });
  });

  describe('Special characters and punctuation', () => {
    it('should remove apostrophes and quotes', () => {
      // Common in album titles
      expect(kebabify("I'm In Your Mind")).toBe('im-in-your-mind');
      expect(kebabify('"Quoted Title"')).toBe('quoted-title');
      expect(kebabify("Satan's Speed")).toBe('satans-speed');
    });

    it('should handle ampersands by converting to "and"', () => {
      // Albums might use & in titles
      expect(kebabify('Rock & Roll')).toBe('rock-and-roll');
      expect(kebabify('This & That')).toBe('this-and-that');
    });

    it('should remove parentheses and brackets', () => {
      expect(kebabify('Album (Deluxe Edition)')).toBe('album-deluxe-edition');
      expect(kebabify('Song [Live Version]')).toBe('song-live-version');
      expect(kebabify('Track {Remix}')).toBe('track-remix');
    });

    it('should handle exclamation marks and question marks', () => {
      expect(kebabify('Help!')).toBe('help');
      expect(kebabify('What?')).toBe('what');
      expect(kebabify('Oh No!!!')).toBe('oh-no');
    });

    it('should handle commas, periods, and other punctuation', () => {
      expect(kebabify('First, Second, Third')).toBe('first-second-third');
      expect(kebabify('End.')).toBe('end');
      expect(kebabify('Semi;Colon:Test')).toBe('semi-colon-test');
    });
  });

  describe('Unicode and special characters', () => {
    it('should handle accented characters by removing accents', () => {
      // International album or artist names
      expect(kebabify('Café')).toBe('cafe');
      expect(kebabify('Naïve')).toBe('naive');
      expect(kebabify('Résumé')).toBe('resume');
    });

    it('should handle various Unicode characters', () => {
      expect(kebabify('München')).toBe('munchen');
      expect(kebabify('Björk')).toBe('bjork');
      expect(kebabify('Señor')).toBe('senor');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty strings', () => {
      expect(kebabify('')).toBe('');
    });

    it('should handle strings with only spaces', () => {
      expect(kebabify('   ')).toBe('');
    });

    it('should handle strings with only special characters', () => {
      expect(kebabify('!!!')).toBe('');
      expect(kebabify('@#$%')).toBe('');
    });

    it('should trim hyphens from start and end', () => {
      expect(kebabify('-Hello-')).toBe('hello');
      expect(kebabify('--World--')).toBe('world');
    });

    it('should handle numbers correctly', () => {
      expect(kebabify('12 Bar Bruise')).toBe('12-bar-bruise');
      expect(kebabify('2020 Album')).toBe('2020-album');
    });
  });

  describe('Real King Gizzard album titles', () => {
    it('should correctly kebabify actual album titles', () => {
      // Testing with real album titles from the discography
      expect(kebabify('12 Bar Bruise')).toBe('12-bar-bruise');
      expect(kebabify('Eyes Like the Sky')).toBe('eyes-like-the-sky');
      expect(kebabify('Float Along - Fill Your Lungs')).toBe('float-along-fill-your-lungs');
      expect(kebabify("I'm In Your Mind Fuzz")).toBe('im-in-your-mind-fuzz');
      expect(kebabify('Paper Mâché Dream Balloon')).toBe('paper-mache-dream-balloon');
      expect(kebabify('Quarters!')).toBe('quarters');
      expect(kebabify('Nonagon Infinity')).toBe('nonagon-infinity');
      expect(kebabify('Flying Microtonal Banana')).toBe('flying-microtonal-banana');
      expect(kebabify('Murder of the Universe')).toBe('murder-of-the-universe');
      expect(kebabify('Sketches of Brunswick East')).toBe('sketches-of-brunswick-east');
      expect(kebabify('Polygondwanaland')).toBe('polygondwanaland');
      expect(kebabify('Gumboot Soup')).toBe('gumboot-soup');
      expect(kebabify('Fishing for Fishies')).toBe('fishing-for-fishies');
      expect(kebabify("Infest the Rats' Nest")).toBe('infest-the-rats-nest');
      expect(kebabify('K.G.')).toBe('kg');
      expect(kebabify('L.W.')).toBe('lw');
    });
  });

  describe('URL safety', () => {
    it('should produce valid URL segments', () => {
      // All outputs should be safe to use in URLs
      const titles = [
        'Album & Songs',
        'Rock/Pop',
        'Question?',
        '100% Real',
        'Hello@World.com',
      ];

      titles.forEach(title => {
        const slug = kebabify(title);
        // URL-safe characters: lowercase letters, numbers, hyphens
        expect(slug).toMatch(/^[a-z0-9-]*$/);
      });
    });

    it('should never produce consecutive hyphens', () => {
      expect(kebabify('Hello - - World')).toBe('hello-world');
      expect(kebabify('Test   -   Case')).toBe('test-case');
    });
  });

  describe('Consistency and reversibility', () => {
    it('should produce consistent results for the same input', () => {
      const title = 'Flying Microtonal Banana';
      const result1 = kebabify(title);
      const result2 = kebabify(title);
      expect(result1).toBe(result2);
    });

    it('should handle already kebabified strings gracefully', () => {
      expect(kebabify('already-kebab-case')).toBe('already-kebab-case');
      expect(kebabify('ALREADY-KEBAB-CASE')).toBe('already-kebab-case');
    });
  });
});