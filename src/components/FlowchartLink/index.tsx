import Image from "next/image";

import kebabify from "@/utils/kebabify";

import { FlowchartLinkWrapper, Info, Button } from "./styles";

interface Props {
  name: string;
  label: string;
}

const FlowchartLink = ({ name, label }: Props) => {
  return (
    <FlowchartLinkWrapper href={`/albums/${kebabify(name)}`}>
      <Image
        src={`/${kebabify(name)}.jpg`}
        alt={`${name} album cover`}
        width="512"
        height="512"
      />
      <Info>
        <p>{label}</p>
        <Button>Go to {name}</Button>
      </Info>
    </FlowchartLinkWrapper>
  );
};

export default FlowchartLink;
