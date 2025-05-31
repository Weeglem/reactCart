import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { productsContext } from "../contexts/ProductsContext";
import { ProductsList } from "../components/ProductLists";
import LoadingPage from "./LoadingPage";

function Home(){
    const products = useContext(productsContext)
    const user = useContext(UserContext)
    const[loaded,setLoaded] = useState(false);

    if(!loaded){

        if(products.loaded){
            setLoaded(true)
        }
    }

    if(!loaded){
        return <LoadingPage/>
    }

    
    
    return(
        <>
            <h1>Productos</h1>
            <ProductsList products={products.products} />
        </>

    );
}

export default Home;

/*<h1>Trending Products</h1>
            <ProductsList products={products.products} />*/