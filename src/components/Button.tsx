'use client';

import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick, className, children,
}) => {
  const defaultStyle = 'outline-dashed rounded text-xl py-1 px-[1.2rem]';
  const styles = twMerge(defaultStyle, className);

  return (
    <button
      className={styles}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
