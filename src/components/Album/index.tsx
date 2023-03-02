import { Frontmatter } from "@/types/frontmatter";
import { AlbumWrapper, Description } from "./styles";

interface Props {
  album: {
    frontmatter: Frontmatter;
  }
}

const Album = ({ album }: Props) => {
  const {
    frontmatter: { title, description },
  } = album;

  return (
    <AlbumWrapper>
      <h1>{title}</h1>
      {album.frontmatter.description && <Description>{description}</Description>}
    </AlbumWrapper>
  );
};

export default Album;
