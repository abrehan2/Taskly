// Imports:
import { cn } from '@/lib/utils';
import { TTypographyComponent } from '@/types/typography';
import { JSX } from 'react';

export default function Typography({
  variant,
  className,
  children,
}: TTypographyComponent) {
  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    p: 'text-base',
    small: 'text-sm text-gray-500',
    muted: 'text-sm text-gray-400',
  };

  const Tag = variant as keyof JSX.IntrinsicElements;

  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}
