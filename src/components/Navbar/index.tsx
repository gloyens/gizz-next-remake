"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { getRandomAlbum } from "@/utils/getRandomAlbum";

import { NavbarWrapper, Items } from "./styles";

const Navbar = () => {
  const router = useRouter();

  const handleRandomAlbum = useCallback(() => {
    const randomAlbum = getRandomAlbum();
    if (randomAlbum) {
      router.push(`/albums/${randomAlbum}`);
    }
  }, [router]);

  return (
    <NavbarWrapper>
      <Items>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/albums">Albums</Link>
        </li>
        <li>
          <button onClick={handleRandomAlbum}>Random</button>
        </li>
      </Items>
    </NavbarWrapper>
  );
};

export default Navbar;
