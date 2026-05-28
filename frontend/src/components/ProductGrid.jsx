import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import { getProducts } from "../services/productService";

function ProductGrid({
  searchTerm = "",
  selectedCategory = "All",
  maxPrice = 5000,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // FETCH PRODUCTS FUNCTION
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      const productsArray = Array.isArray(data) ? data : data.products || [];
      setProducts(productsArray);
      
      // Update active modal product with fresh reviews/ratings if currently open
      if (selectedProductForModal) {
        const updated = productsArray.find((p) => p._id === selectedProductForModal._id);
        if (updated) {
          setSelectedProductForModal(updated);
        }
      }
    } catch (error) {
      console.log("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product?.category === selectedCategory;
    const matchesPrice = product?.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // LOADING STATE
  if (loading && products.length === 0) {
    return (
      <div className="text-center py-20 text-2xl font-bold text-gray-600">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-600">
            No Products Found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={() => setSelectedProductForModal(product)}
            />
          ))}
        </div>
      )}

      {/* PRODUCT DETAILS MODAL OVERLAY */}
      {selectedProductForModal && (
        <ProductDetailsModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
}

export default ProductGrid;