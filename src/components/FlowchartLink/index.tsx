import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";

import kebabify from "@/utils/kebabify";

import { FlowchartLinkWrapper, Info, Arrow } from "./styles";

interface Props {
  name: string;
  label: string;
}

const FlowchartLink = ({ name, label }: Props) => {
  return (
    <FlowchartLinkWrapper href={`./albums/${kebabify(name)}`}>
      <Image
        src={`/${kebabify(name)}.jpg`}
        alt={`${name} album cover`}
        width="256"
        height="256"
      />
      <Info>
        <p>{label} Lorem ipsum dolor sit amet. </p>
        <h2>
          <span>Go to </span>
          {name}
        </h2>
      </Info>
      <Arrow>
        <MdArrowForwardIos />
      </Arrow>
    </FlowchartLinkWrapper>
  );
};

export default FlowchartLink;
