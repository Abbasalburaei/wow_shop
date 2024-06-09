import { createContext } from "react";
import { CartHookProps} from "../types/cartPros";
export const CartContext = createContext<CartHookProps>({itemsCount : 0});