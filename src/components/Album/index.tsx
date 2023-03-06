import Image from "next/image";
import MediaPlayer from "@/components/MediaPlayer";

import { Frontmatter } from "@/types/frontmatter";
import { AlbumWrapper, Description } from "./styles";

interface Props {
  album: {
    frontmatter: Frontmatter;
  }
}

const Album = ({ album }: Props) => {
  const {
    frontmatter: { title, description, bandcampCode, slug },
  } = album;

  return (
    <AlbumWrapper>
      <Image
        src={`/${slug}.jpg`}
        alt={`${title} album cover`}
        width="320"
        height="320"
      />
      <h1>{title}</h1>
      {album.frontmatter.description && <Description>{description}</Description>}
      <MediaPlayer bandcampCode={bandcampCode!}/> {/* TODO: Why is this throwing an error? */}
    </AlbumWrapper>
  );
};

export default Album;
