import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const BaseButton = styled("button", {
  css: css.BaseButton,
  variants: {
    variant: {
      primary: css.variantPrimary,
      secondary: css.variantSecondary,
    },
  },
});
