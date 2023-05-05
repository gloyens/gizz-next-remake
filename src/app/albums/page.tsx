import Navbar from "@/components/Navbar";
import FlowchartLink from "@/components/FlowchartLink";

import { getAlbumData } from "../content";
import { AlbumsContainer, LinksWrapper } from "./styles";
export default async function Albums() {
  const titles = getAlbumData("title");

  return (
    <>
      <Navbar />
      <AlbumsContainer>
        <h1>Albums</h1>
        <LinksWrapper>
          {titles
            .map((title, i) => (
              <FlowchartLink key={i} name={title} label={""} />
            ))
            .reverse()}
        </LinksWrapper>
      </AlbumsContainer>
    </>
  );
}
