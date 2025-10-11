import supabase from "./supabase";

export async function getCartItems() {
  const { data, error } = await supabase.from("cart").select("*, products(*)");

  if (error) {
    console.error(error);
    throw new Error("Cart items could not be loaded");
  }

  return data;
}

export async function addCartItem({ cartItem, stock }) {
  const { data, error } = await supabase.from("cart").insert([{ ...cartItem }]);

  if (error) {
    console.error(error);
    throw new Error("Cart items could not be loaded");
  }

  await supabase
    .from("products")
    .update({
      stock: stock,
    })
    .eq("id", cartItem.product_id);

  return data;
}

export async function updateQuantity(productId, quantity, stock, price) {
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity: quantity, price: price })
    .eq("product_id", productId);

  await supabase
    .from("products")
    .update({
      stock: stock,
    })
    .eq("id", productId);

  if (error) {
    console.error(error);
    throw new Error("Cart item could not be updated");
  }

  return data;
}

export async function deleteCartItem({ item, returendStock }) {
  const { error } = await supabase.from("cart").delete().eq("id", item.id);
  if (error) {
    console.error(error);
    throw new Error("Cart item could not be deleted");
  }
  await supabase
    .from("products")
    .update({ stock: returendStock })
    .eq("id", item.product_id);
}
