'use client';

import React, { FC, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const MainMenu: FC = () => {
  const router = useRouter();
  const [inputValue, setValue] = useState('');
  const [error, setError] = useState(false);

  const onNewGameClick = useCallback(() => {
    if (inputValue !== '') {
      setError(false);
      router.push(`game?user=${inputValue}`);
    } else {
      setError(true);
    }
  }, [inputValue, router]);

  const buttons = [{
    title: 'New Game',
    onClick: onNewGameClick,
  }, {
    title: 'Top rank',
    onClick: () => {},
  }];

  return (
    <>
      <Input
        label="username"
        value={inputValue}
        onChange={setValue}
        error={error ? 'Username is require' : null}
      />

      {buttons.map((button) => (
        <Button
          key={button.title}
          onClick={button.onClick}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default MainMenu;
