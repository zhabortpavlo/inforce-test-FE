import { FC } from "react";
import { Product } from "../../../types/product";
import "./ProductCard.css";

interface IProps {
  product: Product;
  handleDeleteProduct: (id: number) => void;
  setModalOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
}

const ProductCard: FC<IProps> = ({
  product,
  handleDeleteProduct,
  setModalOpen,
  setSelectedProduct,
}) => {
  return (
    <div className="main-card">
      <div className="card-img">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="card-description">
        <h1>{product.name}</h1>
        <p className="product-description">
          <p>Count: {product.count}</p>
          <p>Weight: {product.weight}</p>
          <p>Height: {product.size.height}</p>
          <p>Width: {product.size.width}</p>
        </p>
      </div>
      <div className="button-block">
        <button
          onClick={() => {
            setModalOpen(true);
            setSelectedProduct(product);
          }}
        >
          Edit
        </button>
        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
