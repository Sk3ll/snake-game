'use client';

import React, { useCallback } from 'react';
import { CiCoffeeCup } from 'react-icons/ci';
import { Button } from './Button';
import { BUY_ME_COFFE_URL } from '../common/constants';

export const Footer: React.FC = () => {
  const openBuyMeCoffee = useCallback(() => {
    window.open(BUY_ME_COFFE_URL, '_blank').focus();
  }, []);

  return (
    <footer className="flex justify-center">
      <Button
        onClick={openBuyMeCoffee}
        className="flex items-center gap-1"
      >
        <CiCoffeeCup />
        Buy me a coffe
      </Button>
    </footer>
  );
};
