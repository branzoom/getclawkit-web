'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const cycle = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <button
      onClick={cycle}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label={`Current theme: ${theme}. Click to switch.`}
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5" />
      ) : theme === 'dark' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Monitor className="w-5 h-5" />
      )}
    </button>
  );
}
