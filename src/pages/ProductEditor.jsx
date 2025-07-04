import { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import { productsContext } from '../contexts/ProductsContext';
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router';
import { CartContext } from '../contexts/CartContext';

const ProductEditor = () => {

    const ProductID = useParams().id;
    const Navigate = useNavigate();

    const products = useContext(productsContext);
    const cart = useContext(CartContext);

    const [loaded,setLoaded] = useState(false);

    const[ProdTitle,setTitle] = useState("");
    const[ProdPrice,setPrice] = useState("");
    const[ProdDescription,setDescription] = useState("");
    const[ProdImage,setImage] = useState("");
    const[ProdCategory,setCategory] = useState("")
    
    const [FinalURL,setFinalURL] = useState("")
    const [FinalMethod,setFinalMethod] = useState("");
    const [editing,setEditing] = useState(false)

    //editor is a single script that checks
    //If ID is set or not, if set, 
    //fills the values with the original product data
    //each case fills the url with a custom direction

    if(!loaded){
        if(ProductID){
            if(products.loaded){
                const prodData = products.getProduct(ProductID);
                setFinalURL(`https://6837a1f92c55e01d184a6410.mockapi.io/api/products/${ProductID}`)
                setFinalMethod("PUT");

                setTitle(prodData.title)
                setPrice(prodData.price)
                setDescription(prodData.description)
                setCategory(prodData.category)
                setEditing(true)
                setLoaded(true)
                
            }
        }else{
            setFinalURL("https://6837a1f92c55e01d184a6410.mockapi.io/api/products")
            setFinalMethod("POST")
            setEditing(false)
            setLoaded(true);
        }
    }

    if(!loaded){ return(<LoadingPage />)}

    function isEmpty(value){
        if (value === null || value === "") {
            return true;
        }

        return false
    }
    
    function SubmitForm(ev){
        ev.preventDefault()

        try{

            if(isEmpty(ProdTitle)){throw("Title cannot be empty")}

            if(isEmpty(ProdPrice)){throw("Price cannot be empty")}
            if(ProdPrice < 0){
                throw("Product price cannot be lower than zero!")
            }

            if(isEmpty(ProdCategory)){throw("Category cannot be empty")}
        }catch(err){
            alert(err)
        }

        const data = {
            title : ProdTitle,
            price : ProdPrice,
            description : ProdDescription,
            category : ProdCategory, 
        }

        if(ProductID){
            data.id = ProductID
        }
        
        fetch(FinalURL,{
            method : FinalMethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => { 
            products.editProduct(ProductID,data) 
            alert("Product created succesfuly!")
        }).catch((err) => {
            alert(err)
        })
    }

    function deleteProduct(){
        cart.removeProduct(ProductID);
        products.deleteProduct(ProductID); 
        Navigate("/")
    }

    return (
        <>
            <Container>
                <h1>{ ProductID ? "Edit Product" : "New Product"}</h1>

                <Form onSubmit={SubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label column>Title</Form.Label>
                        <Form.Control required type="text" placeholder="Enter title" value={ProdTitle} onChange={(ev) => setTitle(ev.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label column>Price</Form.Label>
                        <Form.Control required type='number' placeholder="Enter price" value={ProdPrice} onChange={(ev) => setPrice(ev.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required as="textarea" rows={4} placeholder="Enter description" value={ProdDescription} onChange={(ev) => setDescription(ev.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Category</Form.Label>
                        <Form.Control required type="text" placeholder="Enter category" value={ProdCategory} onChange={(ev) => setCategory(ev.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>

                    {
                        (ProductID ? (<Button variant="primary" onClick={() => deleteProduct()}>Delete Product</Button>) : <></>)
                    }


                    
                </Form>
            </Container>
        </>
    )

}

export default ProductEditor;