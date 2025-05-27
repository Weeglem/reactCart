import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../contexts/CartContext';
import { useContext, useEffect, useState } from 'react';

const ProductQuantity = ({product}) => {
    const UserCart = useContext(CartContext);

    return(
        <div className='ProductQuantityController'>
        <ButtonGroup aria-label="Basic example">
            <Button onClick={() => UserCart.changeProductValue(product.id,-1)} style={{background:"black",color:"white"}}> - </Button>
            <Button variant="info" onClick={() => UserCart.changeProductValue(product.id,-1)} className='nobg' disabled>{product.quantity}</Button>
            <Button onClick={() => UserCart.changeProductValue(product.id,1)} style={{background:"black",color:"white"}}> + </Button>
        </ButtonGroup>

        <Button variant="link" onClick={() => UserCart.removeProduct(product.id)} variant='link' className='nobg' ><i class="bi bi-trash"></i></Button>
        </div>
    )

}

export default ProductQuantity;