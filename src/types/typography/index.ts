// Imports:
import { ReactNode } from 'react';

export type TTypographyComponent = {
  children: ReactNode;
  className?: string;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'muted';
};
