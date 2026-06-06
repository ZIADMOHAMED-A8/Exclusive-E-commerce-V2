export default async function getItemAction(itemId:string){
    const res=await fetch(`https://dummyjson.com/products/${itemId}`)
    const data=await res.json()
    if(!res.ok){
        throw new Error(`couldn't fetch item`)
    }
    return data
}