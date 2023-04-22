import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import '../styles/Login.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
 
function Login() {

    const newsSourceUrl = "http://localhost:4000/api/newsSource/"
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [newsSource, setNewsSource] = useState([]);
    let token = "";
    let user = "";
    const navigate = useNavigate();


    //Funcion para obtener las fuentes de noticias
    const getNewsSource = async () => {
        try {
            const datos = await axios.get(newsSourceUrl, {
            //headers:{'Authorization ' : ' Bearer ' + token, 'Content-Type ' : 'application/json'}
        });
          setNewsSource(datos.data);
        } catch (e) {
          console.log(e);
        }
      };
    

    useEffect(()=>{

        getNewsSource();
  
      },[]);

    const handlesubmit = (e) => {
       
        e.preventDefault();

           axios.post('http://localhost:4000/api/login',
            {'email' : email,
             'password' : pwd},
            {
                headers:
                {'Content-Type' : 'application/json'}
            }).then(function (response){
                
                

                if(response){
                    token = response.data.tokenSession
                    localStorage.setItem('token', JSON.stringify(token));
                    user = response.data.data
                    localStorage.setItem('user', JSON.stringify(user));
                    if(user.role != 'admin'){
                      console.log('no es admin');
                      const filtered = newsSource.filter(obj => {
                        return obj.userId === user._id;
                      });
                      if(filtered.length > 0){
                        console.log(filtered)                       
                        navigate("/home");
                      }else{
                        navigate("/newsSource");
                      }
                    }else{
                      navigate("/adminPage");
                    }
                        
                };       
            });
        
      }



  return (
            <>
            
            <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handlesubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                </Form.Group>
                <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
                    <Button className='col-md-4' variant="primary" size="lg" type='submit'>
                        Ingresar
                    </Button>                       
                    <Button  className='col-md-4' variant="secondary" size="lg">
                        Cancelar
                    </Button>
                </Container> <br/>

                <p className='container col-lg-6 col-md-8 col-sm-12 p-4'> Si no tiene cuenta <a href="./registro" target="_blank" rel="noreferrer"> Registrese aqui</a></p>                       
                  
            </Form>            

        </>

  )
}

export default Login
