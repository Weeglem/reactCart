import { useContext, useState} from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";


const Login = () => {
    const User = useContext(UserContext);
    const[username,setUsername] = useState(undefined);

    function login(ev){
        ev.preventDefault() 
        try{
            User.login(username);
        }catch(err){
            alert(err);
        }

        window.location.href ="/"
    }

    return (
        <Container>
            <h1>Member Login</h1>
            
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="usernameForm">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Enter name" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )

}

export default Login;



/*
    useEffect(() => {
        if(User.logged){
            //GO TO LANDING
            return history.go(-1);
        }
    },[])*/