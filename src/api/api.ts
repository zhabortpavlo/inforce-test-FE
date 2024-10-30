import { Product } from "../types/product";

const API_URL = "http://localhost:5000/products";
export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
};

export const addProductToAPI = async (product: Product) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to add product");
  return await response.json();
};

export const updateProductInAPI = async (product: Product) => {
  const response = await fetch(`${API_URL}/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return await response.json();
};

export const deleteProductFromAPI = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
};
