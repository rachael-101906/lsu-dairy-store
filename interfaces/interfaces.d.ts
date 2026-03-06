interface Product {
  id: string;
  flavor: string;
  description: string;
  available: boolean;
  image?: string;
}

interface ProductProps {
  product: any;
}
