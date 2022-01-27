import { FC, ReactNode } from "react";

type ButtonProps = {
  text: string | ReactNode;
  type?: "button" | "submit" | "reset";
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: FC<ButtonProps> = ({ text, type, className, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
