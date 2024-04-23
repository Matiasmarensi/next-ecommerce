"use client";

import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CartDetail = () => {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }),
    [];
  if (!mounted) {
    return <></>;
  }

  return (
    <>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is empty. <br />
          <Link href={"/"}>Cart</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link href={`/product/${item.slug}`} className="flex items-center">
                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button className="btn" type="button" onClick={() => decrease(item)}>
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button className="btn" type="button" onClick={() => increase(item)}>
                        +
                      </button>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetail;