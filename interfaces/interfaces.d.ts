interface Product {
  id: string;
  type?: string; // this can be used to categorize products (e.g., "ice cream", "meat", etc.)
  flavor?: string; // this is the main identifier for the product, especially for ice cream flavors
  description: string; // this can be used to provide more details about the product, such as ingredients, taste profile, etc.
  available: boolean;
  image?: string;
  isPopular?: boolean; // this can be used to highlight popular products in the store

  meatType?: string; // this can be used for meat products to specify the type of meat (e.g., "beef", "pork", etc.)
}

interface ProductProps {
  product: any;
}
