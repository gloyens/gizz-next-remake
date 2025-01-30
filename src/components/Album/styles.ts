"use client";

import BaseImage from "next/image";
import { styled } from "@phantomstudios/css-components";

import css from "./styles.module.css";

export const AlbumWrapper = styled("main", {
  css: css.AlbumWrapper,
});

export const HeroImage = styled(BaseImage, {
  css: css.HeroImage,
});

export const Info = styled("article", {
  css: css.Info,
});
