"use client";

import { useEffect } from "react";
import { Product } from "../api/product.service";
import { useRecentlyViewedStore } from "../store/recently-viewed.store";

export default function ProductViewTracker({ product }: { product: Product }) {
  const addViewedItem = useRecentlyViewedStore((state) => state.addViewedItem);

  useEffect(() => {
    if (product) {
      addViewedItem(product);
    }
  }, [product, addViewedItem]);

  return null;
}
