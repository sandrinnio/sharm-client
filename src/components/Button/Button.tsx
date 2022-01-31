import { FC, ReactNode } from "react";

type ButtonProps = {
  text: string | ReactNode;
  type?: "button" | "submit" | "reset";
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  text,
  type,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
