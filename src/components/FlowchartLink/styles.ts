import Link from "next/link";
import { styled } from "@phntms/css-components";

import css from "./styles.module.css";

export const FlowchartLinkWrapper = styled(Link, {
  css: css.FlowchartLinkWrapper,
});

export const Info = styled("div", {
  css: css.Info,
});

export const Arrow = styled("div", {
  css: css.Arrow,
});
