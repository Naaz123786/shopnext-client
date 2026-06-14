"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        {images.length > 0 ? (
          <Image
            src={images[selectedImage]}
            alt={productName}
            fill
            priority
            className="object-cover transition-all duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
            No Image
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                selectedImage === index
                  ? "border-amber-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
