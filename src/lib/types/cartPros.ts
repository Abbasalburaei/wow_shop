export type CartProps = {
    id:number,
    category:string,
    brand?:string,
    title:string,
    discount?:number,
    thumbnail:string,
    price?:number,
    priceBeforeDisscount?:number,
    quantity:number
};


export type TotalCartProps = {
    itemsCount:number,
    items:CartProps[],
    finalTotal?:number,
    currencyCode?:string,
    totalToWords?:string
};

export type CartHookProps = {
    cart?:TotalCartProps,
    itemsCount:number,
    addToCart?:(productNo:number)=>void
};
