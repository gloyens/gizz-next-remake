import React, { ComponentProps } from "react";

import { BaseButton } from "./styles";

interface Props extends ComponentProps<"button"> {
  variant: "primary" | "secondary";
}

const Button = ({ children, variant }: Props) => {
  return <BaseButton variant={variant}>{children}</BaseButton>;
};

export default Button;
