// import axios from "axios";
/* 
const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const { data } = await axios.get(BASE_URL);
  return data;
}

export async function getFilteredProducts(category) {
  const { data } = await axios.get(`${BASE_URL}/category/${category}`);
  return data;
}
 */

import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getFilteredProducts(category) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error(error);
    throw new Error("Products filter could not be loaded");
  }
  return data;
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
}

// Update Stock
export async function updateStock(id, stock) {
  const { error, data } = await supabase
    .from("products")
    .update({ stock })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be updated");
  }

  console.log(data);
}
