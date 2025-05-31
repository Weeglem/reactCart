import { createContext, useEffect, useState } from "react";

export const productsContext = createContext();

export const ProductsProvider = ({children}) => {
    const [products,setProducts] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {

            if(localStorage.getItem("products")){
                console.log("Loaded from Storage")
                setProducts(JSON.parse(localStorage.getItem("products")));
                setLoaded(true)
            }else{
                //fetch("https://6837a1f92c55e01d184a6410.mockapi.io/api/products")
                fetch("https://fakestoreapi.com/products")
                .then((response) => response.json())
                .then(
                    (data) => {
                    setProducts(data)
                    //SET PRODUCTS LOCAL,
                    //AVOID POSSIBLE SERVER FALL
                    //localStorage.setItem("products",JSON.stringify(data))
                    setLoaded(true)
                }).catch((err) => {
                    console.log(err);
                })
            }


                

    },[])

    function getProduct(id){
        return products.find((item) => item.id == id);
    }

    function productExists(id){
        return products.find((item) => item.id == id) ? true : false;
    }

    function getCategory(category){
        console.log(category);
        return products.filter((item) => item.category == category);
    }

    return <productsContext.Provider value={{products,getProduct,productExists,loaded,setLoaded,getCategory}}>{children}</productsContext.Provider>

}