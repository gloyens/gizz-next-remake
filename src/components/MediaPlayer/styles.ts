"use client";

import { styled } from "@phantomstudios/css-components";

import css from "./styles.module.css";

export const MediaPlayerWrapper = styled("iframe", {
  css: css.MediaPlayerWrapper,
}) as React.ComponentType<React.IframeHTMLAttributes<HTMLIFrameElement>>;
