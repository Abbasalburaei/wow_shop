export type ProductProps = {
    id:number,
    title:string,
    description?:string,
    category:string,
    price:number,
    discountPercentage?:string,
    rating:number,
    stock?:number,
    brand:string,
    tags?:string[],
    images?:string[],
    thumbnail:string,
}