import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/Navbar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cards from '../components/Cards';
import '../styles/Home.css'

function Home() {

  const newsUrl = "http://localhost:4000/api/news/"
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  let user = JSON.parse(localStorage.getItem('user'));
  const categoriesUrl = "http://localhost:4000/api/category/"
  //const [token, setToken] = useState(JSON.parse(localStorage.getItem('token'))); 

  const getNews = async () => {
    try {
      const datos = await axios.get(newsUrl, {
        //headers:{'Authorization ' : ' Bearer ' + token, 'Content-Type ' : 'application/json'}
      });
      let ds = [];
      datos.data.filter((element) => {

        if (element.userId === user._id) {
          console.log(element.userId)
          ds.push(element);
        }
      });
      setNews(ds);
      console.log(datos.data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    getNews();
    getCategories();

  }, [news]);

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


  const handleCategoryChange = (category) => {
    if (category === "Todas") {
      setCategory(null)
    } else {
      setCategory(category);
    }

  };

  const filteredNews = category && category !== "Todas"
    ? news.filter((item) => item.category === category)
    : news;



  return (
    <>
      <NavbarUser />
      <h1>NEWS COVER</h1>
      <div className='categorias'>
        <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select category">
          <Form.Select className="select" aria-label="Floating label select example" value={category} onChange={(e) => setCategory(e.target.value)} onclick={() => handleCategoryChange(category)}>
            {categoriesList.map((cat) => {
              return (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className='noticias'>
        {
          filteredNews.map((item) => (
            <Cards item={item} key={item._id} />
          ))
        }
      </div>

    </>
  )
}

export default Home
