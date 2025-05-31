import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartContext, CartProvider } from '../contexts/CartContext';
import { productsContext } from '../contexts/ProductsContext';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ProductQuantity from './ProductQuantity';
import LoadingPage from '../pages/LoadingPage';

const UserCart = () => {

    const UserCart = useContext(CartContext);
    const Products = useContext(productsContext);
    
    return(
        <>
            <Offcanvas show={UserCart.show}>
                <div className='UserCartPanel'>
                <Offcanvas.Header closeButton onClick={() => UserCart.setShow(!UserCart.show)}>
                    <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {
                        UserCart.Cart.length > 0 ? 
                        (
                            <>
                            
                                {
                                    UserCart.Cart.map((product) => {
                                        const ProductData = Products.getProduct(product.id)
                                        return(
                                            <>
                                                <Row>
                                                    <Col><img src={ProductData.image} style={{width:"120px",height:"120px"}} alt="" /></Col>
                                                    <Col>
                                                        <b>{ProductData.title}</b><br></br>
                                                        <h4><b>${(ProductData.price * product.quantity).toFixed(2)}</b></h4>

                                                        <ProductQuantity product={product}/>
                                                    </Col>
                                                </Row> 
                                                <hr />
                                            </>  
                                        )
                                    })
                                }

                                {/*cHEAT */}

                                Final Price : ${UserCart.getFinal()}

                                <div className="d-grid gap-2">
                                    <Button className="ctaButton" onClick={() => {window.location.href ="/checkout"}}>Checkout</Button>
                                </div>
                                
                                
                                
                            </>
                        ) : 

                        <>
                            Your cart is empty
                        </>
                    }
                    <br></br>
                </Offcanvas.Body>
                </div>
            </Offcanvas>
        </>
    );
}

export default UserCart;