import React from "react";
import api from "../Funciones/apiCat";
import '../styles/Table.css';

function Table(props) {
 

  return (
    <table className="dataTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
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