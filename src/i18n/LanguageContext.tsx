import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Lang } from './translations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTranslations = any;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: AnyTranslations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'hr',
  setLang: () => {},
  t: translations.hr as AnyTranslations,
});

const STORAGE_KEY = 'jam_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'hr' || saved === 'ru') return saved;
    } catch {}
    return 'hr';
  });

  function setLang(l: Lang) {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as AnyTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
