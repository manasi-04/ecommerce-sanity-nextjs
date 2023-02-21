import { State } from "@/components/Cart";
import { ProductProps } from "@/components/Product";
import { createContext, ReactElement, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext({} as State);

export interface Items extends ProductProps {
    quantity: number;
}
export const StateContext = (props: {children: ReactElement}) => {
    const {children} = props;
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState<Items[]>([]);
    const [qty, setqty] = useState(1);
    const [cartQty, setcartQty] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);

    const incQty = () => {
        setqty(qty => qty+1);
    }

    const decQty = () => {
        setqty((prevQty) => {
            if(prevQty - 1 <= 0) return 1;
            return prevQty - 1;
        })
    }

    const onRemove = (product: Items) => {
        const foundItem = cartItems?.find((item: Items) => item._id === product._id);
        const newCart = cartItems?.filter((item: Items) => item._id !== product._id);
        setcartItems(newCart);
        if (foundItem) {
            setcartQty(prev => prev - foundItem.quantity);
            settotalPrice(prev => prev - foundItem.price * foundItem.quantity);
        }
    }

    const updateCartItems = (id: string, type: string) => {
        const foundItem = cartItems.find((item: Items) => item._id === id);
        const index = cartItems.findIndex((item: Items) => item._id === id);
        const newItems = cartItems.filter((item: Items) => item._id !== id);
        if (type === 'inc' && foundItem) {
            setcartItems([...newItems?.slice(0,index), {...foundItem, quantity: foundItem?.quantity + 1}, ...cartItems?.slice(index+1)]);
            setcartQty((prevQuantity) => prevQuantity + 1);
            settotalPrice((prevPrice) => prevPrice + foundItem?.price)
        } else {
            if(foundItem && foundItem.quantity > 1) {
                setcartItems([...newItems.slice(0, index), {...foundItem, quantity: foundItem?.quantity - 1}, ...cartItems.slice(index+1)]);
                setcartQty((prevQuantity) => prevQuantity - 1);
                settotalPrice((prevPrice) => prevPrice - foundItem?.price);
            }
        }
    }

    const onAdd = (product: ProductProps, quantity: number) => {
        setcartQty((prev) => prev + quantity);
        settotalPrice((prev) => prev + (product.price) * quantity);

        const itemAlreadyInCart = cartItems.find((item: Items) => item._id === product._id);
        if (itemAlreadyInCart) {
            const updatedItems: Items[] = cartItems.map((item: Items) => {
                if(item._id === product._id) {
                    return {
                    ...item,
                    quantity: item.quantity + quantity 
                    };
                } else {
                    return item;
                }
            });
            setcartItems(updatedItems);
        } else {
            setcartItems((prevItems) => [...prevItems, { ...product, quantity }]);
        }
        console.log('cartItems', cartItems);
        toast.success(`${qty} ${product.name} added successfully`);
    }

    return (
        <Context.Provider value={{showCart, cartItems, qty, cartQty, totalPrice,
        incQty, decQty, onAdd, setshowCart, updateCartItems, onRemove, setcartItems, setcartQty, settotalPrice}}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext<State>(Context);