import { useEffect, useState } from "react";
import { CartProps, TotalCartProps } from "../types/cartPros";
import { toast } from "react-toastify";
import { ProductProps } from "../types/product";
import { sum } from "lodash";

export default function useCart(){
    const _cart_key = "__WOW_Cart";
    const [cart,setCart] = useState<TotalCartProps>({
         items : [],
         itemsCount : 0
    });
    const [cartItems,setCartItems] = useState(0);
    useEffect(()=>{
        try{
         const cartContent = window.localStorage.getItem(_cart_key);
         if(!cartContent){
            window.localStorage.setItem(_cart_key,JSON.stringify(cart));
         }else{
            setCart(JSON.parse(cartContent) as TotalCartProps);
            getCartItems();
         }
        }catch(e){
        console.error('cart errors',e);
        }
        return ()=>{
            setCart({
                items : [],
                itemsCount : 0
           });
        }
    },[cart?.itemsCount,cartItems]);

     
    const addToCart = (productNo : number)=>{
        const cartContent = window.localStorage.getItem(_cart_key);
        if(!cartContent){
            window.localStorage.setItem(_cart_key,JSON.stringify(cart));
        }else{   
        let _cart  = JSON.parse(cartContent) as TotalCartProps;
        if(_cart){
          fetch(`https://dummyjson.com/products/${productNo}`)
          .then(async req=>{
            if(req.ok){
                const response = await req.json();
                if(response){
                    const responseResult = response as ProductProps;
                    const {id, price,discountPercentage : discount  , brand, category , title , description , thumbnail} = responseResult;
                    let cartItem = _cart?.items?.find(e=>e.id === productNo) ?? undefined;
                    let newPrice = price;
                    if(cartItem){
                       const {quantity } = cartItem;
                       const newQuantity =  quantity + 1;
                       newPrice = newQuantity * (price ?? 1);
                        if(discount){
                          newPrice  = newPrice - (newPrice * (discount / 100));  
                        }
                         cartItem = {...cartItem , brand , category , quantity : newQuantity , price : newPrice ,discount ,priceBeforeDisscount : price};
                        _cart.items = [..._cart?.items?.filter(e=>e.id !== productNo),cartItem];
                    }else{
                         if(discount){
                            newPrice  = newPrice - (newPrice * (discount / 100));  
                          }
                        const newItem : CartProps = {
                            quantity: 1, 
                            id  ,
                            thumbnail,
                            title , 
                            discount,
                            brand ,
                            category ,
                            priceBeforeDisscount : price ,
                            price : newPrice};
                            _cart.items = [..._cart?.items, newItem];
                    }

                    //-----------------------------------------
                    if(_cart?.items?.length > 0){
                        _cart.finalTotal = sum(_cart?.items?.map(e=>e.price));
                    }

                    if(_cart?.items?.length > 0){
                        _cart.itemsCount = sum(_cart?.items?.map(e=>e.quantity ?? 0));
                    }
                    window.localStorage.setItem(_cart_key ,JSON.stringify(_cart));
                    setCart(_cart);
                }
            }else{
                toast.error("Item is not found !!!.");
            }
          }).catch(error=>{
             toast.error("Something wrong happened.");
          });


        }
    }
    };

    const getCartItems = ()=> {
        try{
            const result = window.localStorage.getItem(_cart_key);
            if(result){
              const _cart = JSON.parse(result) as TotalCartProps;
              const count = sum(_cart?.items?.map(e=>e.quantity));
              setCartItems(count);
            }
     
        }catch(e){
            console.error('cart items count ', e);
        }
        return 0;
    };


    return {cart,addToCart,cartItems};
}