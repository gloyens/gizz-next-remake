"use server";

import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Album from "@/components/Album";
import { getMdxBySlug } from "@/app/content";

import { PageContainer } from "./styles";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const album = await getMdxBySlug("albums", params.slug);
  if (album) return { title: album?.frontmatter.title };
}

export default async function Albums({ params }: Props) {
  const album = await getMdxBySlug("albums", params.slug);
  if (!album) return notFound();

  return (
    <>
      <Navbar />
      <PageContainer>
        <Album album={album} />
      </PageContainer>
    </>
  );
}
