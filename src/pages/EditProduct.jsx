import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditProduct = () => {

    const[ProdTitle,setTitle] = useState("");
    const[ProdPrice,setPrice] = useState("");
    const[ProdDescription,setDescription] = useState("");
    const[ProdImage,setImage] = useState("");



    function SubmitForm(ev){

        ev.preventDefault()

        const data = {
            title : ProdTitle,
            price : ProdPrice,
            description : ProdDescription,
            image : ProdImage,
        }

        
        .then((data) => {
            alert("Success!!!")
        }).catch((err) => 
            alert(err)
        )


    }

    return (
        <>
            <Form onSubmit={SubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default EditProduct;