import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function GestionesObra(props) {
  return (
    <div>
      <div className="btn-group">
        <Link to="/MenuObras/TareasEnCurso" className="btn btn-dark">
          Tareas en Curso
        </Link>
        <Link to="/MenuObras/pedidos" className="btn btn-dark">
          Pedidos de Obra
        </Link>
        <Link to="/MenuObras/ABMTareas" className="btn btn-dark">
          ABM Tareas
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default GestionesObra;
