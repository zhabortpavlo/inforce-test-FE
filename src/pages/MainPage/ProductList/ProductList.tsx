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
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      dispatch(setProducts(productsData));
      setSortedProducts(productsData); // Зберігаємо отримані продукти
    };

    loadProducts();
  }, [dispatch]);

  const handleAddProduct = async (product: Product) => {
    const newProduct = await addProductToAPI(product);
    dispatch(addProduct(newProduct));
    setSelectedProduct(null);
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    const product = await updateProductInAPI(updatedProduct);
    dispatch(updateProduct(product));
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProductFromAPI(id);
    dispatch(removeProduct(id));
    setSelectedProduct(null);
  };

  const sortProductsAlphabetically = () => {
    const sorted = [...sortedProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedProducts(sorted);
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
          Sort Products Alphabetically
        </button>
      </div>

      {/* Новий блок для продуктів */}
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
