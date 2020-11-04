import React from "react";
import { Alert } from "reactstrap";

function Notificaciones(props) {
  const [notificaciones, fetchNotificaciones] = React.useState([]);

  React.useEffect(() => {
    ObtenerDatos();
  }, []);

  const ObtenerDatos = async () => {
    const data = await fetch(
      "https://my-json-server.typicode.com/thommgriffiths/Server/notificaciones"
    );
    const notificaciones = await data.json();

    fetchNotificaciones(notificaciones);
  };

  return (
    <div>
      <h1>Notificaciones</h1>
      <ul>
        {notificaciones.map((item) => (
          <li key={item.id}>{item.mensaje}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notificaciones;
