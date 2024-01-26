import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 10000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch("/products", { queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    /*It takes a URL string from the request.url property.
      It creates a URL object from that URL string.
      It extracts the query parameters using the searchParams property.
      It converts the query parameters into an iterable of key-value pairs using the entries() method.
      It spreads these key-value pairs into an array.
      It uses Object.fromEntries() to create a new object where the key-value pairs become properties of the object. */

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    return { products: response.data.data, meta: response.data.meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
