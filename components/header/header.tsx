import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost  text-gl">
            Home
          </Link>
          <ul className="flex">
            <li className="btn btn-ghost  rounded-btn ">
              <Link href="/cart">Cart</Link>
            </li>
            <li className="btn btn-ghost  rounded-btn ">
              <Link href="/about">Sign In</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
