'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Category } from '@/types';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 10;

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias:', error);
        setCategories([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Carregando categorias...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhuma categoria cadastrada ainda.</p>
        <Link
          href="/admin/categorias/nova"
          className="inline-block bg-gold-gradient text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all"
        >
          Cadastrar Primeira Categoria
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCategories = categories.slice(startIndex, endIndex);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Nome</th>
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Slug</th>
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category) => (
              <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-gray-900">{category.name}</td>
                <td className="py-4 px-4 text-gray-600">{category.slug}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/categorias/${category.id}/editar`}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-700"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
