import { Container } from "@/app/styles";

export default function AlbumNotFound() {
  return (
    <Container>
      {/* Don't make it a 404, index all albums */}
      <p>Uh oh! This document couldn&apos;t be found. 🤷‍♂️</p>
    </Container>
  );
}