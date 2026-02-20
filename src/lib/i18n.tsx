'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

export type Locale = 'ko' | 'en';

const translations: Record<Locale, Record<string, string>> = {
  ko: {
    'nav.home': '홈',
    'nav.menu': '메뉴',
    'nav.hours': '영업시간',
    'nav.location': '오시는 길',
    'hero.call': '전화하기',
    'quick.call': '전화',
    'quick.directions': '길찾기',
    'quick.hours': '영업시간',
    'menu.title': '메뉴',
    'hours.title': '영업시간',
    'hours.today': '오늘',
    'location.title': '오시는 길',
    'gallery.title': '갤러리',
    'sns.title': 'SNS',
    'sns.naver': '네이버 블로그',
    'sns.kakao': '카카오톡 채널',
    'theme.light': '라이트 모드로 전환',
    'theme.dark': '다크 모드로 전환',
  },
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.hours': 'Hours',
    'nav.location': 'Location',
    'hero.call': 'Call Now',
    'quick.call': 'Call',
    'quick.directions': 'Directions',
    'quick.hours': 'Hours',
    'menu.title': 'Menu',
    'hours.title': 'Business Hours',
    'hours.today': 'Today',
    'location.title': 'Location',
    'gallery.title': 'Gallery',
    'sns.title': 'Follow Us',
    'sns.naver': 'Naver Blog',
    'sns.kakao': 'KakaoTalk Channel',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',
  },
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'ko',
  setLocale: () => {},
  t: (k) => k,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved === 'ko' || saved === 'en') {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('locale', l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => translations[locale]?.[key] ?? key,
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
