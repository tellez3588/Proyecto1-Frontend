import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    let token = "";
    const navigate = useNavigate();


    
    
    const handlesubmit = (e) => {
       
        e.preventDefault();

           axios.post('http://localhost:4000/api/users',
            {'email' : email,
             'password' : pwd,
             'firstName' : firstName,
             'lastName' : lastName},
            {
                headers:
                {'Content-Type ' : 'application/json'}
            }).then(function (response){
                console.log(response);
                if(response){
                    token = response.data.data.tokenSession
                    localStorage.setItem('token', JSON.stringify(token));
                    navigate("/login");
                };

                
            });
        
      }


  return (
    <>         
        <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicConfirmPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </Form.Group>

            <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
                <Button className='col-md-4' variant="primary" size="lg" type='submit'>
                    Registarse
                </Button>
                <Button className='col-md-4' variant="secondary" size="lg" onClick={useNavigate("/Login")}>
                    Cancelar
                </Button>                       
            </Container>                                      
        </Form> 
    </>
  );
}

export default App;