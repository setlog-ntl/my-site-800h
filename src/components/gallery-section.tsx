'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n';

interface Props {
  images: string[];
}

export function GallerySection({ images }: Props) {
  const { t } = useLocale();

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50 mb-6">
          {t('gallery.title')}
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="shrink-0 w-64 h-64 rounded-xl overflow-hidden snap-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
