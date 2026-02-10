'use client';

import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8 md:mb-12">
      {/* Mobile: Scroll horizontal simples, sem sombra nas extremidades */}
      <div className="md:hidden overflow-x-auto pb-3 -mx-4 px-4 scroll-smooth scrollbar-hide">
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
