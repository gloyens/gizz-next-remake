import Image from "next/image";

import kebabify from "@/utils/kebabify";

import {
  IndividualLinksWrapper,
  IndividualLink,
  Button,
  AlbumLink,
  Content,
} from "./styles";

interface Props {
  nextAlbums: string[];
}

const IndividualLinks = ({ nextAlbums }: Props) => {
  return (
    <IndividualLinksWrapper>
      {nextAlbums.slice(1).map((track) => (
        <AlbumLink href={`/albums/${kebabify(track[1])}`} key={track}>
          <IndividualLink>
            <Image
              src={`/${kebabify(track[1])}.jpg`}
              alt={`${track[1]} album cover`}
              width={64}
              height={64}
            />
            <Content>
              <p>
                If you {track[0] == "Muddy Water" ? "prefer the " : "liked "}
                {track[0]}
                ...
              </p>
              <Button>Go to {track[1]}</Button>
            </Content>
          </IndividualLink>
        </AlbumLink>
      ))}
    </IndividualLinksWrapper>
  );
};

export default IndividualLinks;
