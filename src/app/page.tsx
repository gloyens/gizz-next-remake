import Link from "next/link";

import { Container, Hero } from "./styles";

export default function Home() {
  return (
    <Container>
      <Hero>
        <h1>Get Into Gizz</h1>
        <p>King Gizzard are a genre-confused Australian rock band known for their insane prolificity and tendency to experiment with their sound.</p>
        <Link href={`/albums`}>Get started</Link>
        {/* <Link href={`/albums/${first.album}`}>Get started</Link> */}
      </Hero>
    </Container>
  )
}
