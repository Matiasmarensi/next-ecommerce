import { cache } from "react";
import dbConnection from "../dbConnect";
import ProductModel, { Product } from "../models/ProductModel";

export const revalidate = 3600;

const getLatest = cache(async () => {
  await dbConnection();
  const products = await ProductModel.find({}).sort({ id: -1 }).limit(4).lean();
  return products as Product[];
});
const getFeature = cache(async () => {
  await dbConnection();
  const products = await ProductModel.find({ isFeatured: true }).sort({ id: -1 }).limit(3).lean();
  return products as Product[];
});
const getFeaturesBySlug = cache(async (slug: string) => {
  await dbConnection();
  const product = await ProductModel.findOne({ slug }).lean();
  return product as Product;
});

const productService = {
  getLatest,
  getFeature,
  getFeaturesBySlug,
};

export default productService;
