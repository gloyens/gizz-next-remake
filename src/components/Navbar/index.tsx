import Link from "next/link";

import { NavbarWrapper, Items } from "./styles";

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
    </NavbarWrapper>
  );
};

export default Navbar;
