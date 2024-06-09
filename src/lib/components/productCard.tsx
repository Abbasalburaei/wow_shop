"use client";
import Image from "next/image";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Link from "next/link";
type ProductCardProps = {
    id:number,
    title:string,
    category:string,
    price:number,
    discountPercentage?:string,
    rating:number,
    stock?:number,
    thumbnail:string
};
export default function ProductCard({
    id,
    title,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    thumbnail 
}:ProductCardProps){

    const handleAddToCart = ()=>{
        toast.success(`Item (${title}) was added into cart.`);
    };

    return(
        <article className="h-[22rem] bg-wowLightGray flex flex-col gap-2 border border-wowLightGray w-[15rem] justify-between shadow rounded-md">
        <header className="flex  p-2 flex-row justify-between">
          {discountPercentage && <Tag className=" bg-red-500 min-w-6">{discountPercentage}%</Tag>}
          <div className="bg-wowBlack flex flex-row shadow-sm select-none text-white  rounded-md gap-2 px-2 items-center text-[.8rem] justify-between">
            <span className="">Stock</span>
            <span className="text-wowLightGray">|</span>
            <span>{stock}</span>
          </div>
        </header>
        <Link href={`/${id}`} className="relative grow">
          <Image
          loading="lazy"
          alt={title}
          src={thumbnail}
          objectFit='contain'
          objectPosition="center"  
          layout="fill"
          />
        </Link>
        <div className="h-[9rem] w-full  gap-2 bg-white flex flex-col pt-2">
          <div className="flex flex-row justify-between px-2">
            <span className="font-bold">Category</span>
            <span className="text-wowPrimary">{category}</span>
          </div>
          <div className="flex flex-row justify-between gap-2 px-2 overflow-hidden ">
            <span className="font-bold">Title</span>
            <span title={title} className="text-wowPrimary text-nowrap overflow-ellipsis">{title}</span>
          </div>
          <div className="flex flex-row justify-between gap-2 px-2">
            <span className="font-bold">Price</span>
            <span className="text-wowPrimary text-red-500 font-bold">{price}$</span>
          </div>
          <div className="flex flex-row items-center justify-between bg-wowBlack grow px-2">
            <Rating cancel={false} value={rating}/>
            <div onClick={handleAddToCart} className="text-white cursor-pointer select-none">
              <FontAwesomeIcon icon={faCartPlus}/>
            </div>
          </div>
        </div>
      </article>
    )
}