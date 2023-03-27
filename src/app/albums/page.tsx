import Link from "next/link";

import { Container } from "@/app/styles";

import { getAlbumData, getAllFrontmatter } from "../content";

export default async function Albums() {
  const titles = getAlbumData("title");
  const slugs = getAlbumData("slug");

  return (
    <Container>
      <h1>Albums</h1>
      {titles
        .map((title, i) => (
          <li key={i}>
            <Link href={`/albums/${slugs[i]}`}>{title}</Link>
          </li>
        ))
        .reverse()}
    </Container>
  );
}
