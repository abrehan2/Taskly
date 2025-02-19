// Imports:
import Wrapper from '@/components/generics/wrapper';
import { ModalProvider } from '@/contexts/modal-context';
import { TWrapperComponent } from '@/types/wrapper';

export default function Layout({
  children,
}: Pick<TWrapperComponent, 'children'>) {
  return (
    <Wrapper>
      <ModalProvider>{children}</ModalProvider>
    </Wrapper>
  );
}
