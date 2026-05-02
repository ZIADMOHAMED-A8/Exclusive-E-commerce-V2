"use client"
export default async function getItemsCartAction() {
  if (typeof window === 'undefined') return;

  const localData = localStorage.getItem("cart");
  const cartProducts = localData ? JSON.parse(localData) : [];
  const normalizedProducts = cartProducts.map((item:{
    id:string,
    quantity:string
  }) => ({
  id: Number(item.id), 
  quantity: item.quantity
}))
    console.log(cartProducts)
  const res=await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: normalizedProducts
    })
  })
  if(!res.ok){
    throw new Error('something wrong happened')
  }
  const data=await res.json()
  return data
  
}
