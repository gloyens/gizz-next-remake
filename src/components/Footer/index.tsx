import Link from "next/link";

import { FooterWrapper } from "./styles";

const Footer = () => {
  return (
    <FooterWrapper>
      <Link href="https://github.com/gloyens/gizz-next-remake" target="_blank">
        view on GitHub
      </Link>
    </FooterWrapper>
  );
};

export default Footer;
