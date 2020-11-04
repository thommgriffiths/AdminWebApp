import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function TareasAdmin(props) {
  return (
    <div>
      <div className="btn-group">
        <Link to="/tareasAdmin/Reembolsos" className="btn btn-dark">
          Reembolsos
        </Link>
        <Link to="/tareasAdmin/Pedidos" className="btn btn-dark">
          Pedidos de Obra
        </Link>
        <Link to="/tareasAdmin/Query" className="btn btn-dark">
          Consulta
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default TareasAdmin;
