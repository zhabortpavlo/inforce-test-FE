import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import { Product } from "../../../types/product";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  setProducts,
  updateProduct,
  setSortedProducts,
} from "../../../store";
import Modal from "../Modal/Modal";
import {
  addProductToAPI,
  deleteProductFromAPI,
  fetchProducts,
  updateProductInAPI,
} from "../../../api/api";

const ProductList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const sortedProducts = useSelector(
    (state: any) => state.products.sortedProducts
  );
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        dispatch(setProducts(productsData));
        dispatch(setSortedProducts(productsData));
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, [dispatch]);

  const handleAddProduct = async (product: Product) => {
    try {
      const newProduct = await addProductToAPI(product);
      dispatch(addProduct(newProduct));
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const product = await updateProductInAPI(updatedProduct);
      dispatch(updateProduct(product));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProductFromAPI(id);
      dispatch(removeProduct(id));
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const sortProductsAlphabetically = () => {
    const sorted = [...sortedProducts].sort((a, b) => {
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    dispatch(setSortedProducts(sorted));
    setIsAscending(!isAscending);
  };

  return (
    <div className="product-list">
      <div className="button-container">
        <button
          className="add-product-button"
          onClick={() => {
            setModalOpen(true);
            setSelectedProduct(null);
          }}
        >
          Add Product
        </button>

        <button className="sort-button" onClick={sortProductsAlphabetically}>
          Sort Products {isAscending ? "Descending" : "Ascending"}
        </button>
      </div>

      <div className="product-container">
        {sortedProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleDeleteProduct={handleDeleteProduct}
            setModalOpen={setModalOpen}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        initialData={selectedProduct}
      />
    </div>
  );
};

export default ProductList;
