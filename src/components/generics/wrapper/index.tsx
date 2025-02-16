// Imports:
import { cn } from '@/lib/utils';
import { TWrapperComponent } from '@/types/wrapper';

export default function Wrapper({ children, className }: TWrapperComponent) {
  return (
    <div
      className={cn('w-full h-screen overflow-hidden space-y-10', className)}
    >
      {children}
    </div>
  );
}
