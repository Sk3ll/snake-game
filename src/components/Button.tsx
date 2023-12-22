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
  const style = 'outline-dashed text-xl py-1';
  const styles = twMerge(className, style);

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
