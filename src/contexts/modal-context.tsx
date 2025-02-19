'use client';

// Imports:
import { modalKeys, modalSchema, TModalSchema } from '@/schemas/modal-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const formHook = useForm<TModalSchema>({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      [modalKeys.TITLE]: undefined,
      [modalKeys.DESCRIPTION]: undefined,
      [modalKeys.PRIORITY]: undefined,
      [modalKeys.STATUS]: undefined,
    },
    mode: 'onChange',
  });

  return <FormProvider {...formHook}>{children}</FormProvider>;
};

export const useModalForm = () => {
  const formHook = useFormContext();
  return useMemo(() => ({ formHook }), [formHook]);
};
