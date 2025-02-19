// Imports:
import { UseFormReturn } from 'react-hook-form';
import Typography from '../typography';

export default function FormError({
  formHook,
  name,
}: {
  formHook: UseFormReturn;
  name: string;
}) {
  return (
    <Typography className="text-sm font-normal text-red-500" variant="p">
      {typeof formHook.formState.errors[name]?.message === 'string'
        ? formHook.formState.errors[name]?.message
        : null}
    </Typography>
  );
}
