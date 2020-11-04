import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function GestionesCliente(props) {
  return (
    <div>
      <div>
        <div className="btn-group">
          <Link to="/MenuClientes/Desiciones" className="btn btn-dark">
            Desiciones de Diseño
          </Link>
          <Link to="/MenuClientes/Notificaciones" className="btn btn-dark">
            Notificaciones a Clientes
          </Link>
          <Link to="/MenuClientes/Catalogo" className="btn btn-dark">
            Feedback Catalogo
          </Link>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default GestionesCliente;
