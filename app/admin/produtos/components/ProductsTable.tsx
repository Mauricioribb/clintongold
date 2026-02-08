'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 10;

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Carregando produtos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhum produto cadastrado ainda.</p>
        <Link
          href="/admin/produtos/novo"
          className="inline-block bg-gold-gradient text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:shadow-lg transition-all"
        >
          Cadastrar Primeiro Produto
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Foto</th>
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Nome</th>
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Referência</th>
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Preço</th>
              <th className="text-left py-4 px-4 text-sm font-bold uppercase tracking-widest text-gold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  {product.image ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Sem foto</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-gray-900">{product.name}</td>
                <td className="py-4 px-4 text-gray-600">{product.reference}</td>
                <td className="py-4 px-4 text-gray-900">
                  {product.price > 0 ? (
                    `R$ ${product.price.toFixed(2)}`
                  ) : (
                    <span className="text-gray-500">Sob Consulta</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/produtos/${product.id}/editar`}
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
