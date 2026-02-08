
export interface Product {
  id: string;
  name: string;
  reference: string;
  price: number;
  image: string;
  description?: string;
  gallery?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
