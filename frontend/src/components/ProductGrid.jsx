import {
  useEffect,
  useState,
} from "react";

import ProductCard from "./ProductCard";

import {
  getProducts,
} from "../services/productService";

function ProductGrid({
  searchTerm,
  selectedCategory,
  maxPrice,
}) {

  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH PRODUCTS
  useEffect(() => {

    let isMounted = true;

    (async () => {

      try {

        const data =
          await getProducts();

        if (isMounted) {

          setProducts(data);

          setLoading(false);
        }

      } catch (error) {

        console.log(error);

        if (isMounted) {

          setLoading(false);
        }
      }

    })();

    return () => {

      isMounted = false;
    };

  }, []);

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter((product) => {

      // SEARCH
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      // CATEGORY
      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category ===
            selectedCategory;

      // PRICE
      const matchesPrice =
        product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

  return (
    <div className="flex-1 p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Fresh Groceries
        </h2>

        <p className="text-gray-500 mt-2">
          Explore fresh products from Musalamma Grocery
        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center text-2xl text-gray-500 mt-20">
          Loading products...
        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="text-center text-2xl text-gray-500 mt-20">
          No matching products found
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            )
          )}

        </div>

      )}

    </div>
  );
}

export default ProductGrid;