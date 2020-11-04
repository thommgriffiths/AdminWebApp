import React from "react";
import { Link } from "react-router-dom";

function AdmSistema(props) {
  return (
    <div>
      <div className="btn-group">
        <Link to="/AdministracionSistema/ABMUsuarios" className="btn btn-dark">
          Gestion Usuarios
        </Link>
        <Link to="/AdministracionSistema/ABMObras" className="btn btn-dark">
          Gestion Obras
        </Link>
        <Link to="/AdministracionSistema/ABMTareas" className="btn btn-dark">
          Gestion Tareas
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default AdmSistema;
