import ProductCard from "./ProductCard";
import { Col, Row } from "react-bootstrap";

export const ProductsList = ({products}) => {
    return(
        <Row xs={1}  md={2} lg={5} className="g-4">
        {products.map((product) => (
            <>
            <Col>
                <ProductCard product={product} />
                </Col>
            </>
        ))}
        </Row>
    );
}