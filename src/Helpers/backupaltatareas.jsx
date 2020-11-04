import React from "react";
import { Alert, Table, Button } from "reactstrap";

function ADMTareas(props) {
  const [Tareas, fetchTareas] = React.useState([]);

  React.useEffect(() => {
    ObtenerDatos();
  }, []);

  const ObtenerDatos = async () => {
    const data = await fetch("http://localhost:3002/tareas");
    const Tareas = await data.json();

    fetchTareas(Tareas);
  };

  return (
    <div class="w-50 p-3">
      <h1>Tareas Existentes</h1>
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Tarea</th>
            </tr>
          </thead>
          <tbody>
            {Tareas.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.nombre}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function renderTareas(Tareas) {
  return (
    <div>
      <h1>Tareas Existentes</h1>
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Tarea</th>
              <th>Eliminar elemento</th>
            </tr>
          </thead>
          <tbody>
            {Tareas.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.nombre}</td>
                <td>
                  <Button color="danger">danger</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ADMTareas;
