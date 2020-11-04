import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Alert } from "reactstrap";

function SeleccionObra(props) {
  const [Obras, fetchObras] = React.useState([]);

  React.useEffect(() => {
    ObtenerDatos();
  }, []);

  const ObtenerDatos = async () => {
    const data = await fetch(
      "https://my-json-server.typicode.com/thommgriffiths/Server/Obras"
    );
    const Obras = await data.json();

    fetchObras(Obras);
  };

  return (
    <div class="w-50 p-3">
      <h1>Seleccione la obra</h1>
      <div>
        {Obras.map((item) => (
          <Alert color="dark">
            <a href="/MenuObras" className="alert-link">
              {item.nombre}
            </a>
          </Alert>
        ))}
      </div>
    </div>
  );
}

export default SeleccionObra;
