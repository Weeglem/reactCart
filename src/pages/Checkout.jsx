import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { productsContext } from "../contexts/ProductsContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProductQuantity from "../components/ProductQuantity";
import LoadingPage from "./LoadingPage";


const Checkout = () => {
    const Cart = useContext(CartContext);
    const User = useContext(UserContext);
    const Products = useContext(productsContext);
    const [loaded,setLoaded] = useState(false);

    if(!loaded && Products.loaded){
        setLoaded(true)
    }

    if(!loaded){
        return <LoadingPage/>
    }


    return(
        <>
            <h3>Checkout</h3>
            <Container>
                <Row>
                    <Col>
                    {

                        Cart.Cart.map((product) => {
                            const ProductInfo = Products.getProduct(product.id);
                            return(
                                <>
                                    <Row>
                                        <Col lg={2}>
                                            <img style={{width:"100px",height:"100px"}} src={ProductInfo.image} alt="" />
                                        </Col>
                                        <Col lg={6}>
                                            <Row>
                                                <Col><p>{ProductInfo.title}</p></Col>
                                                <Col><ProductQuantity product={product} CartContext={Cart} /></Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <p style={{marginTop:"15px"}}>${(ProductInfo.price * product.quantity).toFixed(2)}</p>
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                
                                </>
                            )
                        })
                    }
                    </Col>
                    <Col lg={4}>
                        <p><b>Total</b> ${Cart.getFinal()}</p>

                        <div className="d-grid gap-2">
                            <Button className="ctaButton">Finalizar compra</Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Checkout;