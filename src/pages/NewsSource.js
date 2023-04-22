import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import api from "../Funciones/api";
import { Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../components/Navbar';
import Table from '../components/Table';

function App() {

    const [data, setData] = useState([]);
    const [rssUrl, setRssUrl] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [selectedSource, setSelectedSource] = useState(null);
    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user'));
    const categoriesUrl = "http://localhost:4000/api/category/"

    /**************Cargar todas las fuentes*****************/

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.getData();
            let ds = [];
            result.filter((element) => {

                if (element.userId === user._id) {
                    ds.push(element);
                }
            });
            setData(ds);

        };
        fetchData();
    }, [data]);

    /*******Funcion para obtener las categorias disponibles*********/
    const getCategories = async () => {
        try {
            const datos = await axios.get(categoriesUrl, {
                //headers:{'Authorization ' : ' Bearer ' + token, 'Content-Type ' : 'application/json'}
            });
            setCategoriesList(datos.data);
        } catch (e) {
            console.log(e);
        }
    };


    /************************************************************/
    useEffect(() => {

        getCategories();

    }, []);

    /************************************************************/
    const handlesubmit = (e) => {

        e.preventDefault();

        axios.post('http://localhost:4000/api/newsSource',
            {
                'rssUrl': rssUrl,
                'name': name,
                'category': category,
                'userId': user._id
            },
            {
                headers:
                    { 'Content-Type ': 'application/json' }
            }).then(function (response) {
                console.log(response);
                navigate("/home");
            }).then(
                axios.post('http://localhost:4000/api/news/' + user._id + '/Process').then(function (response) {
                    console.log(response);
                })
            );
    }

    /**********************************************************/
    function handleDelete(item) {
        api.deleteData(item)
            .then((response) => {
                axios.post('http://localhost:4000/api/news/' + user._id + '/Process').then(function (response) {
                    console.log(response);
                })
                console.log(response)
                setData(data.filter((d) => d._id !== item._id));
                // Eliminar el elemento de la lista
                // Aquí podrías usar un setState o un método de Redux para actualizar el estado
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**********************************************************/
    function handleEdit(item) {
        setSelectedSource(item);
    }
    /**********************************************************/
    function handleUpdate(e) {
        e.preventDefault();
        api.editData(selectedSource)
          .then((response) => {
            axios.post('http://localhost:4000/api/news/' + user._id + '/Process').then(function (response) {
                    console.log(response);
                })
            console.log(response)
            setSelectedSource(null);
            setData(data.map(source => source._id === response.data._id ? response.data : source));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    /**********************************************************/

    return (
        <>
            <NavbarUser />
            <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handlesubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label> Rss Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter rss url" value={rssUrl} onChange={(e) => setRssUrl(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select category">
                    <Form.Select aria-label="Floating label select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categoriesList.map((cat) => {
                            return (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                </FloatingLabel>

                <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
                    <Button className='col-md-4' variant="primary" size="lg" type='submit'>
                        Agregar
                    </Button>
                </Container>
            </Form>
            <Table data={data} handleDelete={handleDelete} handleEdit={handleEdit} />

            {selectedSource && (
                <Form className='container col-lg-6 col-md-8 col-sm-12 p-5' onSubmit={handleUpdate}>
                    <h3>Editar Fuente Noticias</h3>
                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label> Rss Url</Form.Label>
                    <Form.Control type="text"  value={selectedSource.rssUrl} onChange={(e) => setSelectedSource({ ...selectedSource, rssUrl: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={selectedSource.name} onChange={(e) => setSelectedSource({ ...selectedSource, name: e.target.value })} />
                </Form.Group>

                <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select category">
                    <Form.Select aria-label="Floating label select example" value={selectedSource.category} onChange= {(e) => setSelectedSource({ ...selectedSource, category: e.target.value })}>
                        {categoriesList.map((cat) => {
                            return (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                </FloatingLabel>

                    <Container className='d-grid gap-4 d-md-flex justify-content-md-center'>
                        <Button className='col-md-4' variant="primary" size="lg" type='submit' disabled={!selectedSource}>
                            Actualizar
                        </Button>
                    </Container>
                </Form>
            )}

        </>
    );
}

export default App;