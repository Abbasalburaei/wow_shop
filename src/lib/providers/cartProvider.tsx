import { CartContext } from "../contexts/cartContext";
import useCart from "../hooks/useCartHook";
export default function CartProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const contextValue =  useCart();
    return(
        <CartContext.Provider value={{itemsCount:0}}>
            {children}
        </CartContext.Provider>
    )
}