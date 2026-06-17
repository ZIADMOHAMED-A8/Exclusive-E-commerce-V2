"use client"
import getItemsCartAction from "@/features/cart/actions/getCartItemsAction";
import CategoriesContainer from "@/features/Categories/components/categoriesContainer";
import HeroSection from "@/features/heroSection/heroSection";
import ItemContainer from "@/features/Products/components/itemContainer";

export default function Home() {
  getItemsCartAction()
  
  return (
    <>
    <div className="px-4 py-6 sm:px-8 lg:p-15">
      <HeroSection></HeroSection>
      <ItemContainer viewProductsButton={false} headerText="Flash sales" StyledLabelText="Today's" productsType="all" flasehSale={true} arrowsVisible={true}></ItemContainer>
      <CategoriesContainer></CategoriesContainer>
      <ItemContainer viewProductsButton={false} flasehSale={false} headerText="Best selling products" productsType="sales" StyledLabelText="This month"  arrowsVisible={true}></ItemContainer>
      <ItemContainer viewProductsButton={true} flasehSale={false} StyledLabelText="Our Products" headerText="Explore our products"  productsType="Best_selling_products"  arrowsVisible={true}></ItemContainer>
      <ItemContainer viewProductsButton={false} flasehSale={false} StyledLabelText="New Arrival" headerText="Our Newest Products" productsType="new_Arrival"   arrowsVisible={true}></ItemContainer>
      </div>
    </>
  );
}
