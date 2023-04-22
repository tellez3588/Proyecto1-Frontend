import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import TableCat from '../components/TableCat';
import api from "../Funciones/apiCat";
import '../styles/Admin.css'




function AdminPage() {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  let user = JSON.parse(localStorage.getItem('user'));


  /******************************************************/
  const handlesubmit = (e) => {

    e.preventDefault();
    axios.post('http://localhost:4000/api/category/',
      {
        'name': name
      },
      {
        headers:
          { 'Content-Type ': 'application/json' }
      }).then(function (response) {
        console.log(response);
        setData([...data, response.data]);
      });
  }


  /**************************************************************/
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getData();
      setData(result);

    };
    fetchData();
  }, [data]);

  /***********************************************************/

  function handleEdit(item) {
    setSelectedCategory(item);
  }


  /***********************************************************/
  function handleUpdate(e) {
    e.preventDefault();
    api.editData(selectedCategory)
      .then((response) => {
        console.log(response)
        setSelectedCategory(null);
        setData(data.map(category => category._id === response.data._id ? response.data : category));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /***********************************************************/
  function handleDelete(item) {
    api.deleteData(item)
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className='admin'>
        <p className="welcome">Bienvenido {user.firstName + " " + user.lastName}</p>
        <a href='/login'>Logout</a>
      </div>

      <h1>ADMIN PAGE</h1>
      <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handlesubmit}>
        <h3>Agregar nueva categoria</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
          <Button className='col-md-4' variant="primary" size="lg" type='submit'>
            Agregar
          </Button>
        </Container>
      </Form>
      <TableCat data={data} handleDelete={handleDelete} handleEdit={handleEdit} />


      {selectedCategory && (
        <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handleUpdate}>
          <h3>Editar categoría</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={selectedCategory.name} onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} />
          </Form.Group>

          <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
            <Button className='col-md-4' variant="primary" size="lg" type='submit' disabled={!selectedCategory}>
              Actualizar
            </Button>
          </Container>
        </Form>
      )}

    </>
  );
}

export default AdminPage