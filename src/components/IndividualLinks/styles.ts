"use client";

import Link from "next/link";
import { styled } from "@phantomstudios/css-components";

import css from "./styles.module.css";

export const IndividualLinksWrapper = styled("ul", {
  css: css.IndividualLinksWrapper,
});

export const IndividualLink = styled("li", {
  css: css.IndividualLink,
});

export const Button = styled("span", {
  css: css.Button,
});

export const AlbumLink = styled(Link, {
  css: css.AlbumLink,
});

export const Content = styled("div", {
  css: css.Content,
});
