import React from 'react';
import '../styles/Cards.css';



const Cards = ({item}) => {
    const {title, date, description, permanLink, category} = item;
  return (
    <div className="cards">
        
        <div className="image_box">
            <img src ='unnamed.jpg'/>
        </div>
        <div className="details">
            <p className='titulo'>{title}</p>
            <p>Fecha publicación: {date}</p>
            <p className='categoria'>{category}</p>
            <p className='des'>{description}</p>
            <a href={permanLink}>Ver noticia</a>
        </div>
    </div>
  )
}

export default Cards