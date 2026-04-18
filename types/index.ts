export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
  tags: string[];
  collections?: {
    edges: Array<{
      node: {
        handle: string;
        title: string;
      };
    }>;
  };
}

export interface ProductCardProps {
  product: ShopifyProduct;
  onAddToCart: (productId: string, variantId: string) => void;
}

export type Mode = "couple" | "single";

export interface CategoryTab {
  id: string;
  label: string;
  handle: string;
}
