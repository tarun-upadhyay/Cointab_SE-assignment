"use client";
import React, { FC } from "react";

interface ButtonProps {
  className: string;
  children: string;
  onClick: any;
}

const Button: FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
