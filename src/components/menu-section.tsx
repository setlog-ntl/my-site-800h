'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  items: MenuItem[];
}

export function MenuSection({ items }: Props) {
  const { locale, t } = useLocale();
  const categories = [...new Set(items.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  const filtered = items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-12 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50 mb-6">
          {t('menu.title')}
        </h2>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-[#d47311] text-white'
                  : 'text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 hover:border-[#d47311]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((item, i) => {
              const name = locale === 'en' && item.nameEn ? item.nameEn : item.name;
              const desc = locale === 'en' && item.descEn ? item.descEn : item.desc;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{name}</h3>
                      <span className="text-sm font-medium text-[#d47311] shrink-0">{item.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
