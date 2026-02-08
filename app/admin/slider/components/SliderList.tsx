import { Suspense } from 'react';
import SliderTable from './SliderTable';

export default function SliderList() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <Suspense fallback={<div className="text-center py-8 text-gray-600">Carregando slider...</div>}>
        <SliderTable />
      </Suspense>
    </div>
  );
}
