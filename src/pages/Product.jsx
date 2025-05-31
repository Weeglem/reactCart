
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { productsContext } from "../contexts/ProductsContext";
import { CartContext } from "../contexts/CartContext";
import ProductQuantity from "../components/ProductQuantity";
import Spinner from 'react-bootstrap/Spinner';

import { Row,Col,Button,Container,Badge } from "react-bootstrap";
import ProductScore from "../components/ProductScore";
import LoadingPage from "./LoadingPage";


const Product = () => {

    const products = useContext(productsContext);
    const Cart = useContext(CartContext);

    const [ProductInfo,setProductInfo] = useState([]);
    const [RelatedProducts,setRelatedProducts] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [error,setError] = useState(false);
    
    const ProductID = useParams().id;
    const Navigate = useNavigate();

    //HACK:9
    //WAITS FOR PRODUCTS LOADED, TO ACTUALLY LOAD INFO
    //IGNORE &nbsp;, WAS LAZY
    //THIS SUCKS
    
    useEffect(() => {
        if(products.loaded){
            if(!products.productExists(ProductID)){
                setError("Invalid product")
            }else{
                setProductInfo(products.getProduct(ProductID))   
            }
            
            setLoaded(true)

        }
    },[products.loaded])
    
    

    if(error){ return(
    <>
        <b>{error}</b>
    </>
    ) }

    if(!loaded){ return(
    <LoadingPage />)}

    return(
        <Container style={{maxWidth:"980px"}}>

                <Row>
                    <Col style={{height:"32rem", background:"white",display:"flex",justifyContent:"center",border:"1px solid grey"}}>
                        <img style={{width:"26rem",maxHeight:"29rem", margin:"auto 0", }} src={ProductInfo.image} alt="" />
                    </Col>
                    <Col >
                        
                        <h2>{ProductInfo.title}</h2>
                        <p><ProductScore ProductInfo={ProductInfo}/></p>

                        <Badge style={{marginBottom:"15px"}}>{ProductInfo.category}</Badge>

                        <h2 className='ProductPrice'>${ProductInfo.price/*.toFixed(2)*/}</h2>
                        
                        {
                            Cart.alreadyPurchased(ProductInfo.id) ?

                            <>
                                {/*Already purchased */}
                                <p>Already in cart <i className="bi bi-cart" /></p>
                                <ProductQuantity product={{id:ProductInfo.id,quantity:Cart.getProductQuantity(ProductInfo.id)}} />
                            </>
                            :
                            <>
                                {/*Non purchased */}

                                <div className="d-grid gap-2">
                                    <Button 
                                        className="ctaButton"
                                        onClick={() => Cart.addProduct(ProductInfo.id)} 
                                        title={"Click to add "+ProductInfo.title+" to cart"} 
                                        size="lg">Add to Cart&nbsp;&nbsp;<i class="bi bi-bag"></i>
                                    </Button>

                                    <Button
                                        onClick={() => {Navigate("/product/editor/"+ProductInfo.id)}}
                                    >
                                        Edit Product
                                    </Button>
                                </div>
                            </>
                        }
                        <br></br>
                        <hr></hr>
                        <h3>Description</h3>
                        <p>{ProductInfo.description}</p>                        
                        <p style={{margin:"0px"}}></p>
                    </Col>
                </Row>




        </Container>
    );

    
}

export default Product;