import React, { useState, useEffect } from "react";
import '../styles/Table.css';

function Table(props) {


  
  

  function handleEdit(item) {
    // Lógica para editar el item
  }

  //Cargar solo las fuentes del usuario













  return (
    <table className="dataTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Rss Url</th>
          <th>Name</th>
          <th>Category</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.rssUrl}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>
              <button className="btn btn-success" onClick={() => props.handleEdit(item)}>Editar</button>
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => props.handleDelete(item)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
