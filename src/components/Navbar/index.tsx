import Link from "next/link";

// import { getAlbumData } from "@/app/content";

import { NavbarWrapper, Items } from "./styles";

// const randomAlbum = () => {
//   const slugs = getAlbumData("slug");
//   return slugs[Math.floor(Math.random() * slugs.length)];
// };

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Items />
      <Items>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/albums">All albums</Link>
        </li>
      </Items>
      {/*<Items>
        <li>
          <Link href={`/albums/${randomAlbum()}`}>Random album</Link>
        </li> 
      </Items>*/}
    </NavbarWrapper>
  );
};

export default Navbar;
