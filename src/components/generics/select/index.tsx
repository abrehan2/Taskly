// Imports:
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import React from 'react';

const GenericSelect = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    placeholder?: string;
    options: Array<{ value: string; label: string }>;
    name?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
  }
>(
  (
    {
      className,
      placeholder,
      options,
      name,
      label,
      value = '',
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <Select name={name} {...props} onValueChange={onChange} value={value}>
        <SelectTrigger
          ref={ref}
          className={cn('w-full ring-transparent rounded', className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white text-black">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

GenericSelect.displayName = 'GenericSelect';
export default GenericSelect;
