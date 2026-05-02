"use client";

import ItemCard from "@/features/auth/components/itemCard";
import type { Product } from "@/features/types";
import useGetProducts from "../UseGetProducts";
import type { ProductsType } from "../types";

import { useRef } from "react";
import NavigationArrows from "./navigationArrows";
import StyledLabel from "./styledLabel";
import CountDown from "./countDown";

export default function ItemContainer({
  productsType,
  flasehSale,
  arrowsVisible,
  StyledLabelText,
  headerText,
  viewProductsButton
}: {
  productsType: ProductsType;
  arrowsVisible: boolean,
  flasehSale: boolean,
  StyledLabelText: string,
  headerText: string,
  viewProductsButton: boolean

}) {
  const { data, isPending, error } = useGetProducts(productsType);
  const containerRef = useRef(HTMLDivElement)

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
    <section className="flex flex-col gap-8  p-4 overflow-hidden   max-w-full">
      <StyledLabel>
        {StyledLabelText}
      </StyledLabel>
      {flasehSale && arrowsVisible ?
        <div className="flex gap-2 items-center  justify-between   ">
          <div className="flex gap-16 items-center">
            <h1 className="text-3xl font-bold">{headerText}</h1>
            {flasehSale && <CountDown></CountDown>}
          </div>
          <div className="flex items-center gap-2">
            <NavigationArrows containerRef={containerRef}></NavigationArrows>
          </div>
        </div>
        :
        flasehSale ?
          <p>flashsale</p>
          :
          arrowsVisible ?
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{headerText}</h1>
              <div className="flex gap-2 items-center  justify-end  ">
                <NavigationArrows containerRef={containerRef}></NavigationArrows>
              </div>
            </div>
            :
            <></>
      }



      <div ref={containerRef} className="flex overflow-x-hidden gap-4">
        {data.products.map((item: Product) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {viewProductsButton &&
        <div className="flex justify-center">
          <button className=" px-8 py-4 text-white  bg-[#db4444]">View All Products</button>
        </div>
      }
    </section>
  );
}
