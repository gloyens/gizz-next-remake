import FlowchartLink from "@/components/FlowchartLink";

import { FlowchartLinksWrapper } from "./styles";

interface Props {
  nextAlbums: string[];
}

const FlowchartLinks = ({ nextAlbums }: Props) => {
  return (
    <FlowchartLinksWrapper>
      {nextAlbums.map((album, index) => (
        <FlowchartLink
          key={album[0]}
          name={album[0]}
          label={album[1]}
          number={index + 1}
        />
      ))}
    </FlowchartLinksWrapper>
  );
};

export default FlowchartLinks;
