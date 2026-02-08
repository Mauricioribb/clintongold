
export interface Product {
  id: string;
  name: string;
  reference: string;
  price: number;
  image: string;
  description?: string;
  gallery?: string[];
  categoryId?: string;
  tag?: string;
  active?: boolean | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SliderImage {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
