"use server"

import { notFound } from "next/navigation";

import Album from "@/components/Album";
import { Container } from "@/app/styles";
import { getMdxByAlbum } from "@/app/content";

interface Props {
    params: {
        album: string;
    };
}

export async function generateMetadata({ params }: Props) {
  const album = await getMdxByAlbum("albums", params.album);
  if (album) return { title: album?.frontmatter.title };
}

export default async function Albums({ params }: Props) {
  const album = await getMdxByAlbum("albums", params.album);
  if (!album) return notFound();

  return (
    <Container>
      <Album album={album}/>
    </Container>
  );
}