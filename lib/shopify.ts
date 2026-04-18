import type { ShopifyProduct } from "@/types";

const SHOPIFY_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

interface GraphQLQuery {
  query: string;
  variables?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function shopifyFetch<T>(
  query: GraphQLQuery
): Promise<GraphQLResponse<T>> {
  try {
    const response = await fetch(SHOPIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN || "",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Shopify fetch error:", error);
    return {
      data: undefined,
      errors: [{ message: "Failed to fetch from Shopify" }],
    };
  }
}

export async function getProductsByCollection(
  collectionHandle: string,
  first: number = 12
): Promise<ShopifyProduct[]> {
  const query = {
    query: `
      query GetProductsByCollection($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          products(first: $first) {
            edges {
              node {
                id
                title
                handle
                description
                featuredImage {
                  url
                  altText
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                tags
              }
            }
          }
        }
      }
    `,
    variables: {
      handle: collectionHandle,
      first,
    },
  };

  try {
    const response = await shopifyFetch<{ collection: { products: { edges: Array<{ node: ShopifyProduct }> } } }>(query);
    if (response.data?.collection?.products?.edges) {
      return response.data.collection.products.edges.map(edge => edge.node);
    }
    return [];
  } catch (error) {
    console.error("Error fetching products by collection:", error);
    return [];
  }
}

export async function getProductsByTag(tag: string, first: number = 12) {
  const query = {
    query: `
      query GetProductsByTag($tag: String!, $first: Int!) {
        products(first: $first, query: "tag:\\"${tag}\\"") {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              tags
            }
          }
        }
      }
    `,
    variables: {
      tag,
      first,
    },
  };

  return shopifyFetch(query);
}

export async function getAllProducts(first: number = 12) {
  const query = {
    query: `
      query GetAllProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              tags
            }
          }
        }
      }
    `,
    variables: {
      first,
    },
  };

  return shopifyFetch(query);
}

export function calculateDiscount(
  compareAtPrice: string | number | undefined,
  salePrice: string | number
): number {
  if (!compareAtPrice) return 0;
  const compare = parseFloat(String(compareAtPrice));
  const sale = parseFloat(String(salePrice));
  if (compare <= sale) return 0;
  return Math.round(((compare - sale) / compare) * 100);
}

export function formatPrice(amount: string | number): string {
  const num = parseFloat(String(amount));
  return `$${num.toFixed(2)}`;
}
