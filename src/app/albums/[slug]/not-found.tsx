import { Container } from "@/app/styles";

export default function AlbumNotFound() {
  return (
    <Container>
      {/* Don't make it a 404, index all albums */}
      <p>Uh oh! This album doesn&apos;t exist yet. 🤷‍♂️</p>
    </Container>
  );
}