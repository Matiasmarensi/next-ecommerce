import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import productService from "@/lib/services/productService";
import { convertDocToObject } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const featureProducts = await productService.getFeature();
  const lastestProducts = await productService.getLatest();
  return (
    <>
      <div className="w-full carousel rounded-box mt-4">
        {featureProducts.map((product, index) => (
          <div key={product._id} id={`slide-${index}`} className="carousel-item relative w-full">
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} className="w-full" alt={product.name} />
            </Link>

            <div
              className="absolute flex justify-between transform 
               -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a href={`#slide-${index === 0 ? featureProducts.length - 1 : index - 1}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide-${index === featureProducts.length - 1 ? 0 : index + 1}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl py-2  ">Latest Productsasdas</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {lastestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObject(product)}></ProductItem>
        ))}
      </div>
    </>
  );
}
