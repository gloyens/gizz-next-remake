import { getMDXComponent } from "mdx-bundler/client";

import { Frontmatter } from "@/types/frontmatter";
import MediaPlayer from "@/components/MediaPlayer";
import FlowchartLinks from "@/components/FlowchartLinks";

import IndividualLinks from "../IndividualLinks";
import { AlbumWrapper, HeroImage, Info } from "./styles";

interface Props {
  album: {
    frontmatter: Frontmatter;
    code: string;
  };
}

const Album = ({ album }: Props) => {
  const Content = getMDXComponent(album.code);

  const {
    frontmatter: { title, bandcampCode, slug, nextAlbums },
  } = album;

  return (
    <>
      <HeroImage
        src={`/${slug}.jpg`}
        alt={`${title} album cover`}
        width="512"
        height="512"
      />
      <AlbumWrapper>
        <Info>
          <Content />
        </Info>
        <MediaPlayer bandcampCode={bandcampCode ? bandcampCode : 0} />
        {nextAlbums[0] == "compilation" ? (
          <IndividualLinks nextAlbums={nextAlbums} />
        ) : (
          <FlowchartLinks nextAlbums={nextAlbums} />
        )}
      </AlbumWrapper>
    </>
  );
};

export default Album;
