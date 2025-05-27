import { createContext, useEffect, useState } from "react";

export const productsContext = createContext();

export const ProductsProvider = ({children}) => {
    const [products,setProducts] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        let products = localStorage.getItem("products");

            fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then(
                (data) => {
                setProducts(data)
                localStorage.setItem("products",data)
                setLoaded(true)
            }).catch((err) => {
                console.log(err);
            })

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