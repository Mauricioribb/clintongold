
import { NavItem, Product } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Quero Vender', href: '/vender' },
  { label: 'Jóias', href: '/joias' },
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Aliança Luxo Ouro 18k', reference: '2181', price: 0, image: 'https://picsum.photos/seed/gold1/600/600' },
  { id: '2', name: 'Aliança Classic Gold', reference: '2179', price: 0, image: 'https://picsum.photos/seed/gold2/600/600' },
  { id: '3', name: 'Aliança Eternity', reference: '2178', price: 0, image: 'https://picsum.photos/seed/gold3/600/600' },
  { id: '4', name: 'Anel de Noivado Diamond', reference: '2177', price: 0, image: 'https://picsum.photos/seed/gold4/600/600' },
  { id: '5', name: 'Aliança Minimalista', reference: '2171', price: 0, image: 'https://picsum.photos/seed/gold5/600/600' },
  { id: '6', name: 'Anel Cravejado Refinado', reference: '2163', price: 0, image: 'https://picsum.photos/seed/gold6/600/600' },
  { id: '7', name: 'Aliança Polida Especial', reference: '2162', price: 0, image: 'https://picsum.photos/seed/gold7/600/600' },
  { id: '8', name: 'Solitário Elegance', reference: '2161', price: 0, image: 'https://picsum.photos/seed/gold8/600/600' },
];

export const CONTACT_INFO = {
  phone: '+55 (71) 99136-9104',
  whatsappUrl: 'https://wa.me/5571991369104',
  email: 'clintongoldcomercial@gmail.com',
  instagram: '@clintongold_oficial',
  hours: {
    week: 'Segunda – Sexta: 8:00 – 19:00',
    saturday: 'Sábado: 8:00 – 15:00'
  },
  logoUrl: 'https://clintongold.com.br/storage/2024/08/clintogold-logo-300x50.webp'
};
