import Image from "next/image";

import kebabify from "@/utils/kebabify";

import {
  IndividualLinksWrapper,
  IndividualLink,
  Button,
  Link,
  Content,
} from "./styles";

interface Props {
  nextAlbums: string[];
}

const IndividualLinks = ({ nextAlbums }: Props) => {
  return (
    <IndividualLinksWrapper>
      {nextAlbums.slice(1).map((track) => (
        <IndividualLink key={track}>
          <Link href={`/albums/${kebabify(track[1])}`}>
            <Image
              src={`/${kebabify(track[1])}.jpg`}
              alt={`${track[1]} album cover`}
              width={64}
              height={64}
            />
            <Content>
              If you {track[0] == "Muddy Water" ? "prefer the " : "liked "}
              {track[0]}
              ...
              <Button>Go to {track[1]}</Button>
            </Content>
          </Link>
        </IndividualLink>
      ))}
    </IndividualLinksWrapper>
  );
};

export default IndividualLinks;
