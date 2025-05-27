import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const Footer = () => {

    return(
        <>
            <footer>
                <Container>
                    <Row>
                        <Col>
                            <Link><i className="bi bi-instagram"></i></Link>
                            <Link><i className="bi bi-facebook"></i></Link>
                            <Link><i className="bi bi-whatsapp"></i></Link>
                        
                        </Col>
                        <Col>
                            <ul>
                                <li><b>Mi cuenta</b></li>
                                <li><Link>Mi perfil</Link></li>
                                <li><Link>Mi carrito</Link></li> 
                            </ul>
                        </Col>

                        <Col>
                            <ul>
                                <li><b>Informacion ùtil</b></li>
                                <li><Link>¿Que es Esto? </Link></li>
                                <li><Link>Sell here</Link></li> 
                                <li><Link>Blog</Link></li>
                                <li><Link>Marcas</Link></li>
                                <li><Link>Centro de ayuda</Link></li>
                            </ul>
                        </Col>
                    
                    
                    </Row>


                </Container>
            </footer>
        </>
    )
}

export default Footer;