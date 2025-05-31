import { createContext, useState, useContext, useEffect } from "react";
import { productsContext } from "./ProductsContext";


export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const[Cart,setCart] = useState([]);
    const [show,setShow] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0)
    const [Loaded,setLoaded] = useState(false)

    const Products = useContext(productsContext);
    

    if(Products.loaded && !Loaded){
        const cartLoad = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        let finalPriceLoad = localStorage.getItem("finalPrice") ? localStorage.getItem("finalPrice") : [];
        finalPriceLoad = parseFloat(finalPriceLoad) ? parseFloat(finalPriceLoad) : 0;

        setCart(cartLoad)  
        setFinalPrice(finalPriceLoad)
        setLoaded(true)
    }
    
    //TODO: move setFinal to function

    function SaveCart(){
        console.log(Cart)
        localStorage.setItem("cart",JSON.stringify(Cart));
        localStorage.setItem("finalPrice",finalPrice)
        console.log("Updated cart")
    }
    

    /***Already in cart */
    function alreadyPurchased(id){
        return Cart.find((product) => product.id === id) ? true : false;
    }

    /***Returns the id quantity */
    function getProductQuantity(id){
        return Cart.find((product) => product.id === id).quantity;
    }

    function addProduct(id){
        if(alreadyPurchased(id)){
            setCart(cart => cart.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))
            setFinalPrice(finalPrice + Products.getProduct(id).price) 
        }else{
            const newitem = {id :id, quantity: 1}
            setCart(userCart => [...userCart,newitem]);3
            setFinalPrice(finalPrice + Products.getProduct(id).price)
        }

        SaveCart()
        

    }

    /***Final price converter */
    function getFinal(){
        return finalPrice.toFixed(2);
    }

    
    function removeProduct(id){

        const x = getProductQuantity(id);
        setFinalPrice(finalPrice - Products.getProduct(id).price * x)
        const newCart = Cart.filter((product) => (product.id !== id));

        //QUICK PATCH
        newCart.length == 0 ? setCart([]) : setCart(newCart);
        SaveCart();
    }

    function changeProductValue(id,newVal){
        if(getProductQuantity(id) > 0){
            setCart(cart => cart.map(item => item.id === id ? {...item, quantity: item.quantity + newVal} : item))
            setFinalPrice(finalPrice + Products.getProduct(id).price * newVal)
    
        }else{
            removeProduct(id);
        }

        SaveCart()
    }
    

    return <CartContext.Provider value={{
        Cart,
        setCart,
        show,
        setShow,
        finalPrice,
        setFinalPrice,
        getFinal,

        getProductQuantity,
        alreadyPurchased,
        addProduct,
        removeProduct,
        changeProductValue
    
    }}>{children}</CartContext.Provider>
}