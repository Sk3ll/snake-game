'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps {
    label: string;
    value: string;
    error: string;
    onChange: (value: string) => void;
    className?: string;
    wrapperClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  error,
  onChange,
  className = '',
  wrapperClassName = '',
}) => {
  const defaultStyle = 'outline-dashed rounded py-[0.3rem] px-[1.2rem] text-center';
  const defaultWrapperStyle = 'flex flex-col gap-y-2 text-l capitalize';
  const styles = twMerge(defaultStyle, className);
  const wrapperStyles = twMerge(defaultWrapperStyle, wrapperClassName);

  return (
    <label className={wrapperStyles} htmlFor={label}>
      {label}
      <input
        className={styles}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="text-red-500">{error}</span>}
    </label>
  );
};
