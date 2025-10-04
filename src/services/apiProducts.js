import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const { data } = await axios.get(BASE_URL);
  return data;
}

export async function getFilteredProducts(category) {
  const { data } = await axios.get(`${BASE_URL}/category/${category}`);
  return data;
}
