'use client';

import { useState } from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8 md:mb-12">
      {/* Mobile: Scroll horizontal */}
      <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wide text-[10px] whitespace-nowrap transition-all flex-shrink-0 ${
              selectedCategory === null
                ? 'bg-gold-gradient text-black shadow-lg'
                : 'bg-white/5 border border-white/10 text-white'
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wide text-[10px] whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-gold-gradient text-black shadow-lg'
                  : 'bg-white/5 border border-white/10 text-white'
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
