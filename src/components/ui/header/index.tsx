'use client';

// Imports:
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '../button';

export default function Header() {
  const [toggle, setToggle] = useState('light');
  const { setTheme } = useTheme();

  function toggleHandler() {
    setToggle((prev) => (prev === 'light' ? 'dark' : 'light'));
    setTheme(toggle);
  }

  return (
    <div className="w-full py-5 px-10 flex justify-between items-center shadow-sm">
      <Avatar className="transition-transform duration-300 ease-in-out hover:scale-110 size-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-primary text-white">R</AvatarFallback>
      </Avatar>

      <Button
        size="icon"
        className={cn(
          'rounded bg-primary hover:bg-orange-400 transition-transform duration-300 ease-in-out hover:rotate-180'
        )}
        onClick={toggleHandler}
      >
        {toggle === 'light' ? (
          <SunIcon className="size-6" />
        ) : (
          <MoonIcon className="size-6 text-white" />
        )}
      </Button>
    </div>
  );
}
