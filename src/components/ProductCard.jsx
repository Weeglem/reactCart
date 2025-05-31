import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import Badge from 'react-bootstrap/Badge';
import { Navigate, useNavigate } from 'react-router';
import ProductScore from './ProductScore';



const ProductCard = ({product}) => {


  const Navigate = useNavigate();

  
  function viewProduct(){
      Navigate("/product/"+product.id)
  }


  const Cart = useContext(CartContext);

    return(
    <Card onClick={(ev) => {ev.preventDefault(); viewProduct()}} key={product.id} className='ProductCard'>
      <div style={{display:"flex",justifyContent:"center",background:"white"}}>
        <Card.Img variant="bottom" src={product.image} style={{width:"140px",height:"160px"}} />
      </div>
      
      <Card.Body>
        <p style={{fontWeight:"bold",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap", margin:0}}>{product.title}</p>
        <p style={{margin:0}}><ProductScore ProductInfo={product} /></p>
        <h3 style={{marginTop:"15px"}} className='ProductPrice'>${product.price}</h3>
      </Card.Body>
    </Card>);
}

export default ProductCard;

/*{
<Badge>{product.category}</Badge>
          Cart.alreadyPurchased(product.id) ?

          
          <>
            
            <a href='#' onClick={() => Cart.removeProduct(product.id)}>Remove from cart <i class="bi bi-bag-dash"></i></a><br></br>
            <Button onClick={() => Cart.changeProductValue(product.id,-1)}> - </Button>
            <span> {Cart.getProductQuantity(product.id)} </span>
            <Button onClick={() => Cart.changeProductValue(product.id,1)}> + </Button>
          </>
          :
          <>
            
            
            <a style={{color:"black"}} title={"Click to add "+product.title+" to cart"} href='#' onClick={() => Cart.addProduct(product.id)}>
              <i class="bi bi-bag"></i>
            </a>
          </>
        }*/