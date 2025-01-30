"use client";

import BaseLink from "next/link";
import { styled } from "@phantomstudios/css-components";

import css from "./styles.module.css";

export const PageContainer = styled("div", {
  css: css.PageContainer,
});

export const Link = styled(BaseLink, {
  css: css.Link,
});
