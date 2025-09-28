import axios from "axios";

export async function getProducts() {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
}
