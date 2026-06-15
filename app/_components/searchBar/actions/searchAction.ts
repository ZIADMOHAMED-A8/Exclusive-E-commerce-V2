"use server"
export default async function searchACtion(query:string){
    if(query=="")return []
    console.log(query,"query")

    let res=await fetch(`https://dummyjson.com/products/search?q=${query}&limit=5`)
    let data=await res.json()
    if(!res.ok){
        throw new Error(data.message)
    }
    return data.products.length>1 ? data : {products:[]}
}