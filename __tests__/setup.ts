/**
 * Test Setup and Configuration
 * 
 * This file configures the testing environment for the King Gizzard discography site.
 * The site is built with Next.js and uses MDX for album content, Three.js for 3D graphics,
 * and Bandcamp embeds for media playback.
 */

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock MDX components
jest.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-content">{source}</div>,
}));

// Mock fs for testing file system operations
jest.mock('fs', () => ({
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
}));

// Mock Three.js and React Three Fiber components
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="three-canvas">{children}</div>,
  useFrame: jest.fn(),
  useLoader: jest.fn(),
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Environment: () => <div data-testid="environment" />,
}));

// Global test utilities
export const mockAlbumData = {
  title: 'Nonagon Infinity',
  slug: 'nonagon-infinity',
  releaseDate: '2016-05-06',
  index: 10,
  bandcampLink: 'https://kinggizzard.bandcamp.com/album/nonagon-infinity',
  spotifyLink: 'https://open.spotify.com/album/1234567890',
  youtubeLink: 'https://youtube.com/watch?v=abc123',
  imageSrc: '/images/nonagon-infinity.jpg',
  content: 'This is the album content in MDX format.',
};

export const mockAlbumList = [
  {
    title: 'Nonagon Infinity',
    slug: 'nonagon-infinity',
    releaseDate: '2016-05-06',
    index: 10,
    imageSrc: '/images/nonagon-infinity.jpg',
  },
  {
    title: 'Flying Microtonal Banana',
    slug: 'flying-microtonal-banana',
    releaseDate: '2017-02-24',
    index: 11,
    imageSrc: '/images/flying-microtonal-banana.jpg',
  },
  {
    title: 'Murder of the Universe',
    slug: 'murder-of-the-universe',
    releaseDate: '2017-06-23',
    index: 12,
    imageSrc: '/images/murder-of-the-universe.jpg',
  },
];