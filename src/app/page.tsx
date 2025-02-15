import Navbar from "@/components/Navbar";

import HomeCanvas from "./webgl/home";
import { Container, Hero, InfoWrapper } from "./styles";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <Hero>
        <InfoWrapper>
          <h1>Get Into Gizz</h1>
          <p>
            King Gizzard are a genre-confused Australian rock band known for
            their insane prolificity and tendency to experiment with their
            sound. Fans think they&apos;re a once-in-a-generation talent, but
            with <strong>26 studio albums</strong> (and counting!) to choose
            from, where do you start?
          </p>

          <p>
            This website aims to answer that question, and to serve as your
            guide through the Gizzverse. Click the album to get started!
          </p>
        </InfoWrapper>
        <HomeCanvas />
      </Hero>
    </Container>
  );
}
