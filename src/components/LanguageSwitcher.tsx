'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
  { code: 'en', label: 'EN', name: 'English' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params.locale as string) || 'fr';

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    startTransition(() => {
      router.push(newPath);
    });
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-espresso';
  const hoverBg = variant === 'light' ? 'hover:bg-white/10' : 'hover:bg-cream';

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-lg ${textColor} ${hoverBg} transition-colors`}
        disabled={isPending}
      >
        <Globe className="w-4 h-4" />
        <span className="font-sans font-medium text-sm">
          {languages.find((lang) => lang.code === currentLocale)?.label}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full text-left px-4 py-3 text-sm font-sans hover:bg-cream transition-colors first:rounded-t-lg last:rounded-b-lg ${
              lang.code === currentLocale ? 'bg-cream text-ruban-red font-semibold' : 'text-espresso'
            }`}
          >
            <span className="block font-medium">{lang.label}</span>
            <span className="block text-xs opacity-70">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
