import Image from "next/image";

import kebabify from "@/utils/kebabify";

import { FlowchartLinkWrapper, Info, Button } from "./styles";

interface Props {
  name: string;
  label: string;
  number: number;
}

const FlowchartLink = ({ name, label, number }: Props) => {
  return (
    <FlowchartLinkWrapper href={`./albums/${kebabify(name)}`}>
      <Info>
        <h2>0{number}</h2>
        <p>{label} Lorem ipsum dolor sit amet. </p>
        <Button>Go to {name}</Button>
      </Info>
      <Image
        src={`/${kebabify(name)}.jpg`}
        alt={`${name} album cover`}
        width="256"
        height="256"
      />
    </FlowchartLinkWrapper>
  );
};

export default FlowchartLink;
