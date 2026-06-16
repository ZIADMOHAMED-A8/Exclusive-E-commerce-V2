"use client"
export default async function getItemsCartAction() {
  if (typeof window === 'undefined') return;

  const localData = localStorage.getItem("cart");
  const cartProducts = localData ? JSON.parse(localData) : [];
  if(cartProducts.length===0){return []}
  const normalizedProducts = cartProducts.map((item: {
    id: string,
    quantity: string
  }) => ({
    id: Number(item.id),
    quantity: item.quantity
  }))
  console.log(cartProducts)
  const res = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      products: normalizedProducts
    })
  })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message)
  }
  return data

}
