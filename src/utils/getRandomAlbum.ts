import { getAllFrontmatter } from '@/app/content';

// Dynamically get all album names from the filesystem
function getAlbumNames(): string[] {
  const albums = getAllFrontmatter('albums');
  return albums.map(album => album.slug).filter(Boolean);
}

export function getRandomAlbum(): string | null {
  const albumNames = getAlbumNames();
  if (albumNames.length === 0) return null;
  return albumNames[Math.floor(Math.random() * albumNames.length)];
}
