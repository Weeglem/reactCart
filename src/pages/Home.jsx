import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { productsContext } from "../contexts/ProductsContext";
import { ProductsList } from "../components/ProductLists";

function Home(){
    const products = useContext(productsContext)
    const user = useContext(UserContext)
    
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