import React, { FC, JSX, PropsWithChildren } from 'react';

interface ComposeProps {
    providers: JSX.ElementType[];
}

export const Compose: FC<PropsWithChildren<ComposeProps>> = ({ providers = [], children }) => (
  <>
    {providers.reduceRight(
      (acc: React.ReactNode, Comp: JSX.ElementType) => (
        <Comp>{acc}</Comp>
      ),
      children,
    )}
  </>
);
