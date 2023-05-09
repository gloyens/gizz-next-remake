import { BaseButton } from "./styles";

type Props = React.ComponentProps<typeof BaseButton>;

const Button = ({ children, variant }: Props) => {
  return <BaseButton variant={variant}>{children}</BaseButton>;
};

export default Button;
