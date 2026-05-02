"use client"
import getItemsCartAction from "@/features/cart/actions/getCartItemsAction";
import ItemContainer from "@/features/Products/components/itemContainer";
import Image from "next/image";

export default function Home() {
  getItemsCartAction()
  
  return (
    <>
    <div className="p-15">
      <ItemContainer viewProductsButton={false} headerText="Flash sales" StyledLabelText="Today's" productsType="all" flasehSale={true} arrowsVisible={true}></ItemContainer>
      <ItemContainer viewProductsButton={false} flasehSale={false} headerText="Best selling products" productsType="sales" StyledLabelText="This month"  arrowsVisible={true}></ItemContainer>
      <ItemContainer viewProductsButton={true} flasehSale={false} StyledLabelText="Our Products" headerText="Explore our products"  productsType="Best_selling_products"  arrowsVisible={true}></ItemContainer>
      <ItemContainer viewProductsButton={false} flasehSale={false} StyledLabelText="New Arrival" headerText="Our Newest Products" productsType="new_Arrival"   arrowsVisible={true}></ItemContainer>
      </div>
    </>
  );
}
