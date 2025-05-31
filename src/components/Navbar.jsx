
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router';


const WebNavbar = () => {
    const User = useContext(UserContext);
    const cart = useContext(CartContext);
    const Navigate = useNavigate();

    function NavigateTo(ev,URL){
      ev.preventDefault();
      Navigate(URL)
    }

    return (
      <>
        <Navbar sticky="top" expand="lg" className="bg-body-tertiary Navbar">
          <Container>
            <Navbar.Brand href="/" onClick={(ev) => NavigateTo(ev,"/")} style={{color:'white'}}>Tienda</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href='/' onClick={(ev) => NavigateTo(ev,"/")}>Productos</Nav.Link>
                
                  
              </Nav>
            </Navbar.Collapse>

            <div className="justify-content-end">
                <Nav.Link className="justify-content-end" onClick={() => cart.setShow(!cart.show)}><i className="bi bi-cart"></i> My Cart (${cart.getFinal()})</Nav.Link>
                
                {
                    User.userData.logged ? 
                    <>
                      <NavDropdown title={User.userData.name} id="basic-nav-dropdown" >
                        <NavDropdown.Item href="#action/3.1" style={{color:"black !important"}} onClick={() => {User.logout()}}>Logout</NavDropdown.Item> 
                      </NavDropdown>
                    </>
                    :
                    <>
                      <Nav.Link href="/login" onClick={(ev) => NavigateTo(ev,"/login")}  className="justify-content-end" >
                        <i className="bi bi-person"></i> Login 
                      </Nav.Link>
                    </>
                }
            </div>

          </Container>
        </Navbar>  
      </>
    
  );
}

export default WebNavbar;