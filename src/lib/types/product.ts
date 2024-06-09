export type ProductProps = {
    id:number,
    title:string,
    description?:string,
    category:string,
    price:number,
    discountPercentage?:number,
    rating:number,
    stock?:number,
    brand:string,
    tags?:string[],
    images?:string[],
    thumbnail:string,
}