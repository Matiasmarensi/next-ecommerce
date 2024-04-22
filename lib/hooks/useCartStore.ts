import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem } from "../models/OrderModel";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export const cartStore = create<Cart>(() => initialState);

export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore.getState();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      const updateCartItem = exist
        ? items.map((x) => (x.slug === exist.slug ? { ...exist, qty: exist.qty + 1 } : x))
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrice(updateCartItem);
      cartStore.setState({ items: updateCartItem, itemsPrice, taxPrice, shippingPrice, totalPrice });
    },
  };
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(items.reduce((a, c) => a + c.price * c.qty, 0));
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 100);
  const taxPrice = round2(Number(itemsPrice * 0.15));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  };
};
