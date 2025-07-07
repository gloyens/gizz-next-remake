# King Gizzard Discography Site - Test Suite Documentation

This test suite serves as both validation and documentation for the King Gizzard & The Lizard Wizard discography website. The tests are written to be readable and informative, explaining how each part of the application works.

## 🏗️ Architecture Overview

The site is built with:
- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **MDX** for album content
- **Three.js** for 3D visualizations
- **Tailwind CSS** for styling

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with 3D vinyl
│   ├── albums/            
│   │   ├── page.tsx       # Albums listing
│   │   └── [slug]/        # Dynamic album pages
│   ├── content/           # MDX utilities
│   └── webgl/             # Three.js components
├── components/            # React components
├── utils/                 # Helper functions
└── types/                 # TypeScript definitions

data/
└── albums/               # MDX files for each album
```

## 🧪 Test Categories

### 1. Utility Functions (`__tests__/utils/`)

#### `array.test.ts` - Array Sorting
- **sortByIndex**: Sorts albums by their chronological index
- Handles missing indices by placing them at the end
- Maintains stable sort for equal values

#### `kebabify.test.ts` - URL Slug Generation
- Converts album titles to URL-safe slugs
- Handles special characters, accents, and punctuation
- Examples: "I'm In Your Mind Fuzz" → "im-in-your-mind-fuzz"

#### `getRandomAlbum.test.ts` - Random Album Selection
- Reads album MDX files from the filesystem
- Returns random album metadata for homepage display
- Filters out non-MDX files

### 2. MDX Content (`__tests__/app/content/`)

#### `mdx.test.ts` - Content Management
- **getAllFrontmatter**: Loads all album metadata
- **getMdxBySlug**: Loads specific album by slug
- **getAlbumData**: Combines frontmatter and content
- Handles YAML frontmatter parsing

### 3. React Components (`__tests__/components/`)

#### Core Components
- **Album**: Main album detail display with media player and links
- **Button**: Reusable button with primary/secondary variants
- **Navbar**: Site navigation with home and albums links
- **Footer**: Site footer with copyright

#### Album Display Components
- **FlowchartLink**: Individual album card with image and navigation
- **FlowchartLinks**: Grid layout for multiple albums
- **MediaPlayer**: Bandcamp embed for album/track playback
- **IndividualLinks**: External links to streaming services

### 4. Pages (`__tests__/app/`)

#### `page.test.tsx` - Home Page
- 3D vinyl record visualization
- Random album recommendation
- Navigation to albums listing

#### `albums/page.test.tsx` - Albums Listing
- Displays all albums in chronological order
- Uses sortByIndex for proper ordering
- Grid layout with FlowchartLinks

#### `albums/[slug]/page.test.tsx` - Album Detail
- Dynamic routing for individual albums
- Displays full album information
- Integrates media player and streaming links

### 5. Type Definitions (`__tests__/types/`)

#### `types.test.ts` - Data Structures
- **Frontmatter**: Album metadata from MDX files
- **AlbumType**: Extended type with slug and content
- Documents expected data shapes and constraints

## 🎯 Key Features Tested

### Navigation Flow
1. Home page → Random album suggestion
2. Home page → Albums listing → Individual album
3. Direct navigation to specific albums via URL

### Data Flow
1. MDX files in `/data/albums/` contain album information
2. Frontmatter parsed for metadata (title, date, links)
3. Content rendered as React components
4. Albums sorted by index for chronological display

### Media Integration
- Bandcamp player embeds for album streaming
- Support for both full albums and individual tracks
- External links to Spotify and YouTube

### Responsive Design
- Grid layouts adapt to screen size
- Typography scales appropriately
- Images maintain aspect ratios

## 🚀 Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- array.test.ts
```

## 📊 Coverage Goals

The test suite aims for:
- **80%+ coverage** for all source files
- **100% coverage** for utility functions
- **Comprehensive testing** of user flows
- **Type safety validation** for data structures

## 🔍 Test Patterns

### Component Testing
```typescript
// Render component with props
render(<Component prop="value" />);

// Query elements
const element = screen.getByRole('button');

// Assert behavior
expect(element).toBeInTheDocument();
```

### Mocking
- Next.js navigation (`useRouter`)
- File system operations (`fs`)
- External components (Three.js)
- MDX content rendering

### Accessibility
- Semantic HTML structure
- ARIA attributes
- Keyboard navigation
- Screen reader compatibility

## 📚 Understanding the Codebase

The tests are written to be educational. Each test file includes:
- **Header comments** explaining the component/function purpose
- **Descriptive test names** that document behavior
- **Inline comments** for complex logic
- **Real-world examples** using actual album data

## 🎸 Album Data Structure

Albums are stored as MDX files with frontmatter:

```yaml
---
title: "Nonagon Infinity"
releaseDate: "2016-05-06"
index: 10
imageSrc: "/images/nonagon-infinity.jpg"
bandcampLink: "https://kinggizzard.bandcamp.com/album/nonagon-infinity"
spotifyLink: "https://open.spotify.com/album/..."
youtubeLink: "https://youtube.com/..."
albumId: 3055533230
---

# Album content in Markdown/MDX format
```

## 🛠️ Extending the Test Suite

When adding new features:
1. Write tests first (TDD approach)
2. Include documentation in test descriptions
3. Test both happy paths and edge cases
4. Maintain the educational nature of tests
5. Update this README with new patterns

## 🎵 About the Site

This site showcases the complete discography of King Gizzard & The Lizard Wizard, an Australian psychedelic rock band known for their prolific output and genre experimentation. The site features:
- Interactive 3D vinyl visualization
- Comprehensive album information
- Embedded music players
- Links to streaming platforms
- Responsive, accessible design

The test suite ensures all these features work correctly while serving as living documentation for developers.