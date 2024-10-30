import { Product } from "../../../types/product";
import "./Modal.css";

import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setCount(initialData.count);
        setImageUrl(initialData.imageUrl);
        setWeight(initialData.weight);
        setWidth(initialData.size.width);
        setHeight(initialData.size.height);
        setName("");
        setCount(0);
        setImageUrl("");
        setWeight("");
        setWidth(200);
        setHeight(200);
      }
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      id: initialData ? initialData.id : Date.now(),
      name,
      count,
      imageUrl,
      weight,
      size: { width, height },
      comments: [],
    };
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label>Weight</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              required
            />
          </div>

          <button type="submit">{initialData ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
