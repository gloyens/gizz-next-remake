import Image from "next/image";

import { Frontmatter } from "@/types/frontmatter";
import MediaPlayer from "@/components/MediaPlayer";

import { AlbumWrapper } from "./styles";

interface Props {
  album: {
    frontmatter: Frontmatter;
  };
}

const Album = ({ album }: Props) => {
  const {
    frontmatter: { title, bandcampCode, slug },
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
      <MediaPlayer bandcampCode={bandcampCode!} />{" "}
      {/* TODO: Why is this throwing an error? */}
    </AlbumWrapper>
  );
};

export default Album;
