'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 4);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, categories]);

  return (
    <div className="mb-8 md:mb-12">
      {/* Mobile: Scroll horizontal elegante */}
      <div className="md:hidden relative">
        {/* Fade esquerdo */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            showLeftFade ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Fade direito */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            showRightFade ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-3 -mx-4 px-4 scroll-smooth scrollbar-hide"
        >
          <div className="flex items-center gap-2.5 min-w-max py-1">
            <button
              onClick={() => onCategoryChange(null)}
              className={`px-5 py-2 rounded-full font-bold uppercase tracking-wide text-[11px] whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                selectedCategory === null
                  ? 'bg-gold-gradient text-black shadow-[0_2px_12px_rgba(212,175,55,0.35)] scale-105'
                  : 'bg-white/[0.06] border border-white/[0.12] text-white/70 active:scale-95'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-5 py-2 rounded-full font-bold uppercase tracking-wide text-[11px] whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-gold-gradient text-black shadow-[0_2px_12px_rgba(212,175,55,0.35)] scale-105'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white/70 active:scale-95'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Layout normal */}
      <div className="hidden md:flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${
            selectedCategory === null
              ? 'bg-gold-gradient text-black shadow-lg'
              : 'bg-white/5 border border-white/10 text-white hover:border-gold hover:text-gold'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${
              selectedCategory === category.id
                ? 'bg-gold-gradient text-black shadow-lg'
                : 'bg-white/5 border border-white/10 text-white hover:border-gold hover:text-gold'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
