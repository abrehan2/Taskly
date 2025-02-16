// Imports:
import Wrapper from '@/components/generics/wrapper';
import { TWrapperComponent } from '@/types/wrapper';

export default function Layout({
  children,
}: Pick<TWrapperComponent, 'children'>) {
  return <Wrapper>{children}</Wrapper>;
}
