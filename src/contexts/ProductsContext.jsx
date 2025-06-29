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
            fetch("https://fakestoreapi.com/products")
            .then((response) => response.json())
            .then(
                (data) => {
                setProducts(data);
                localStorage.setItem("products",JSON.stringify(data));
                setLoaded(true);
            }).catch((err) => {
                console.log(err);
            })
        }
    },[])

    function updateDB(){
        localStorage.setItem("products",JSON.stringify(products));
    }

    function getProduct(id){
        return products.find((item) => item.id == id);
    }

    function productExists(id){
        return products.find((item) => item.id == id) ? true : false;
    }

    function getCategory(category){
        return products.filter((item) => item.category == category);
    }

    function getName(name){
        return products.filter((item) => item.title == name)
    }
    
    function filterName(products,name){
        return products.filter(
            product => 
                product.title.toLowerCase().includes(name.toLowerCase())
        )
    }

    function filterCategory(products,category){
        return products.filter(
            product => 
                product.category.toLowerCase().includes(category.toLowerCase())
        )
    }

    function getTags(){
        const Test = new Map();
        products.map(product =>  Test.set(product.category))

        return Test; 
    }

    function editProduct(id,newData = {}){
        setProducts(products.map(product => product.id == id ? {...newData} : product));
        updateDB();
    }

    function deleteProduct(id){
        console.log("Deleted product")
        setProducts(products.filter((product) => product.id != id));
        updateDB();
        
    }

    return <productsContext.Provider value={{
        loaded,
        setLoaded,

        products,
        getProduct,
        productExists,
        getCategory,
        editProduct,
        deleteProduct,
        filterName,
        getTags,
    }}>{children}</productsContext.Provider>

}