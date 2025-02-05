"use client";

import { ComponentPropsWithoutRef } from "react";

import { styled } from "@phantomstudios/css-components";

import css from "./styles.module.css";

/**
 * TODO: Unsure why this is necessary - looks like the project's just old.
 * Update when possible.
 */

interface BaseButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "secondary";
}

export const BaseButton = styled("button", {
  css: css.BaseButton,
  variants: {
    variant: {
      primary: css.variantPrimary,
      secondary: css.variantSecondary,
    },
  },
}) as React.FC<BaseButtonProps>;
