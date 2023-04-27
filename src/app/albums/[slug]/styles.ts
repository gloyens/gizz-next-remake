import BaseLink from "next/link";
import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const PageContainer = styled("div", {
  css: css.PageContainer,
});

export const Link = styled(BaseLink, {
  css: css.Link,
});
