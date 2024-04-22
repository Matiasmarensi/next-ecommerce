"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { Order, OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  //redner a button
  const router = useRouter();
  const { items, increase } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();
  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
    console.log(items);
  };
  return existItem ? (
    <div>
      <button className="btn" type="button">
        -
      </button>
      <span>{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button className={"btn btn-primary w-full"} type="button" onClick={addToCartHandler}>
      Add To Cart
    </button>
  );
}
