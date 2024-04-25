"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { data: session } = useSession();

  const singOutHandler = () => {
    console.log("singOutHandler");
    signOut();
  };
  return (
    <div>
      <ul className="flex items-strech">
        <li>
          <Link className="btn btn-ghost rounded-btn" href="/cart">
            Cart
            {mounted && items.length > 0 && (
              <div className="badge badge-secondary">{items.reduce((acc, item) => acc + item.qty, 0)} </div>
            )}
          </Link>
        </li>

        {session && session.user ? (
          <>
            <li>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-btn">
                  {session.user.name}
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <button onClick={singOutHandler}>Sign out</button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <li>
            <button className="btn btn-ghost rounded-btn" type="button" onClick={() => signIn()}>
              Sign in
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Menu;
