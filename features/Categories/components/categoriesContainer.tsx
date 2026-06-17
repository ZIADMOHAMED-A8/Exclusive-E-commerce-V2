"use client";

import StyledLabel from "@/features/Products/components/styledLabel";
import NavigationArrows from "@/features/Products/components/navigationArrows";
import {
  Armchair,
  Bike,
  Car,
  Gem,
  Glasses,
  House,
  Laptop,
  Package,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  SprayCan,
  Tablet,
  Utensils,
  Watch,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import useGetCategories from "../UseGetCategories";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  beauty: Sparkles,
  fragrances: SprayCan,
  furniture: Armchair,
  groceries: ShoppingBasket,
  "home-decoration": House,
  "kitchen-accessories": Utensils,
  laptops: Laptop,
  "mens-shirts": Shirt,
  "mens-shoes": Package,
  "mens-watches": Watch,
  "mobile-accessories": Smartphone,
  motorcycle: Bike,
  "skin-care": Sparkles,
  smartphones: Smartphone,
  "sports-accessories": Package,
  sunglasses: Glasses,
  tablets: Tablet,
  tops: Shirt,
  vehicle: Car,
  "womens-bags": ShoppingBag,
  "womens-dresses": Shirt,
  "womens-jewellery": Gem,
  "womens-shoes": Package,
  "womens-watches": Watch,
};

export default function CategoriesContainer() {
  const { data, isPending, error } = useGetCategories();
  const containerRef = useRef<HTMLDivElement>(null);

  if (isPending) {
    return <p>laoding....</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <section className="flex flex-col gap-8 p-4 overflow-hidden max-w-full">
      <StyledLabel>Categories</StyledLabel>
      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Browse By Category</h1>
        <div className="flex gap-2 items-center justify-end">
          <NavigationArrows containerRef={containerRef}></NavigationArrows>
        </div>
      </div>
      <div ref={containerRef} className="flex overflow-x-hidden gap-4">
        {data.map((category) => {
          const CategoryIcon = CATEGORY_ICONS[category.slug] ?? ShoppingBag;

          return (
            <Link
              key={category.slug}
              href={`/products?mode=${category.slug}`}
              className="h-[145px] border basis-full sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-48px)/4)] p-4 shrink-0 border-black/40 flex flex-col items-center justify-center gap-5 px-3 text-center transition-colors hover:border-[#db4444]"
            >
              <CategoryIcon size={56} strokeWidth={1.8} className="text-black" />
              <span className="font-normal text-gray-600">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
