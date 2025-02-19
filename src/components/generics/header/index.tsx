'use client';

// Imports:
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { Button } from '../../ui/button';

export default function Header({ Fallback = 'R' }: { Fallback?: string }) {
  const { setTheme, theme } = useTheme();

  function toggleHandler() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="w-full py-5 px-10 flex justify-between items-center border-b border-ligt dark:border-dark">
      <Avatar className="transition-transform duration-300 ease-in-out hover:scale-110 size-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="dark:bg-white dark:text-black bg-black text-white">
          {Fallback}
        </AvatarFallback>
      </Avatar>

      <Button
        size="icon"
        className={cn(
          'rounded bg-black hover:bg-opacity-85 dark:bg-white dark:text-black dark:hover:bg-opacity-85 transition-transform duration-300 ease-in-out hover:rotate-180'
        )}
        onClick={toggleHandler}
      >
        {theme === 'light' ? (
          <MoonIcon className="size-6 text-white dark:text-black" />
        ) : (
          <SunIcon className="size-6 text-white dark:text-black" />
        )}
      </Button>
    </div>
  );
}
