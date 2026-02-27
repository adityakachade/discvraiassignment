// types/product.js

// Since we're using JavaScript, we'll just export the type definitions as comments
// for documentation purposes. The actual data structures will be plain objects.

/*
Product interface:
{
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
}
*/

/*
AskResponse interface:
{
  productIds: string[];
  summary: string;
  products: Product[];
  cached: boolean;
}
*/

/*
ProductsResponse interface:
{
  products: Product[];
  total: number;
}
*/

// Export empty object for compatibility
export {};
