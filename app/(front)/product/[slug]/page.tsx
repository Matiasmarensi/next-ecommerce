import AddToCart from "@/components/products/AddToCart";
import data from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = data.products.find((p) => p.slug === params.slug);
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="my-2">
        <Link href="/">Back to Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-2">
            <li>
              <h1 className="text-2xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-0 max-h-80 ">
          <div className="card-body">
            <div className="mb-2 flex justify-between">
              <div>Price: </div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <div className="card-actions justify-center">
              {product.countInStock > 0 && (
                <div className="card-actions justify-center">
                  <AddToCart item={{ ...product, qty: 0, color: "", size: "" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
