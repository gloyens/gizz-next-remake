import Link from "next/link";
import Button from "@/components/Button";

import { Container, Hero, InfoWrapper, InfoContainer, ButtonsContainer, Credits } from "./styles";

export default function Home() {
  return (
    <Container>
      <Hero>
        <h1>Get Into Gizz</h1>
      </Hero>
      <InfoWrapper>
        <InfoContainer>
          <p>King Gizzard are a genre-confused Australian rock band known for their insane prolificity and experimental sound. Fans think they're a once-in-a-generation talent, but with 23 studio albums (and counting!) to choose from, where do you start?</p>
          <p>This website aims to answer that question, and to serve as your guide through the Gizzverse. So, without further ado...</p>
          <ButtonsContainer>
            <Link href={"/albums/im-in-your-mind-fuzz"}>
              <Button>Let's go</Button>
            </Link>
            <Link href={"/albums"}>
              <Button variant="secondary">See all albums</Button>
            </Link>
          </ButtonsContainer>
        </InfoContainer>
      </InfoWrapper>
      <Credits>
        <Link href={"https://www.github.com/gloyens"} target="_blank">@gloyens</Link>
      </Credits>
    </Container>
  )
}
