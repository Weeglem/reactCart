import { useContext, useEffect, useState } from "react";
import { productsContext } from "../contexts/ProductsContext";
import { UserContext } from "../contexts/UserContext";
import { ProductsList } from "../components/ProductLists";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadingPage from "./LoadingPage";

const Home = () => {

    const products = useContext(productsContext)

    const [DisplayProductsList,setDisplayProductsList] = useState(null)
    const [loading,SetLoading] = useState(true);

    const [searchName,setName] = useState(null);
    const [searchCategory,setCategory] = useState(null);

    //TRIGGER SEARCH 
    // //EVERYTIME SEARCHNAME CHANGES
    // SUCKS
    useEffect(() => {
        if(!loading){
            if(searchName != "" && searchName != null )
            setDisplayProductsList(products.filterName(products.products,searchName));
        }
    },[searchName])

    if(loading){
        if(products.loaded){
            SetLoading(false)
            setDisplayProductsList(products.products)
        }
    }

    if(loading){
        return(<LoadingPage />)
    }

    return(
        <>
            <Form.Control onChange={(ev) => {setName(ev.target.value);}}  size="lg" type="text" placeholder="Product name" />
            
            {
                DisplayProductsList.length > 0 ?
                <ProductsList products={DisplayProductsList}/>
                :
                "No results found"
            }

        </>
    )
}

export default Home;