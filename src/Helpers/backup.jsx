import React from "react";
import { Alert, Table } from "reactstrap";
import { render } from "@testing-library/react";

//https://reactstrap.github.io/components/tables/

function QRC(props) {
  const [Report, fetchReport] = React.useState([]);
  const [filter, setfilter] = React.useState(2);

  React.useEffect(() => {
    ObtenerDatos();
  }, []);

  const ObtenerDatos = async () => {
    const data = await fetch("http://localhost:3002/jornalesQR");
    const Report = await data.json();

    fetchReport(Report);
  };

  function changefilter(i) {
    setfilter(i);
  }

  function formatDDMM(fecha) {
    return fecha.getDate() + "/" + (fecha.getMonth() + 1);
  }
  //onClick={changefilter(2)}

  return (
    <div class="w-50 p-3">
      <h1>Resumen</h1>
      <div className="btn-group">
        <div className="btn btn-dark">Contratista</div>
        <div className="btn btn-dark">Obra</div>
        <div className="btn btn-dark">Rubro</div>
      </div>
      <Summary elements={Report} filter={filter} />

      <Detalle elements={Report} />
    </div>
  );
}

function Summary({ elements, filter }) {
  function ColumnName() {
    if (filter == 1) {
      return <th>Obra</th>;
    } else if (filter == 2) {
      return <th>Rubro</th>;
    } else {
      return <th>Contratista</th>;
    }
  }

  function createSummary() {
    var helper = {};

    var filtertype = filter;

    var result = elements.reduce(function (r, o) {
      var key;
      if (filtertype == 1) {
        key = o.obra.id;

        if (!helper[key]) {
          let summaryItem = {
            nombre: o.obra.nombre,
            total: o.total,
          };
          helper[key] = Object.assign({}, summaryItem); // create a copy of o
          r.push(helper[key]);
        } else {
          helper[key].total += o.total;
        }
      } else if (filtertype == 2) {
        key = o.tarea.id;

        if (!helper[key]) {
          let summaryItem = {
            nombre: o.tarea.nombre,
            total: o.total,
          };
          helper[key] = Object.assign({}, summaryItem); // create a copy of o
          r.push(helper[key]);
        } else {
          helper[key].total += o.total;
        }
      } else {
        key = o.contratista.id;

        if (!helper[key]) {
          let summaryItem = {
            nombre: o.contratista.firstname,
            total: o.total,
          };
          helper[key] = Object.assign({}, summaryItem); // create a copy of o
          r.push(helper[key]);
        } else {
          helper[key].total += o.total;
        }
      }

      return r;
    }, []);

    return result.map((item, index) => (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{item.nombre}</td>
        <td>{item.total}</td>
      </tr>
    ));
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            {ColumnName()}
            <th>Total Jornales</th>
          </tr>
        </thead>
        <tbody>{createSummary()}</tbody>
      </Table>
    </div>
  );
}

function Detalle({ elements }) {
  return (
    <div>
      <h1>Detalle </h1>
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Contratista</th>
              <th>Obra</th>
              <th>Rubro</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.contratista.firstname}</td>
                <td>{item.obra.nombre}</td>
                <td>{item.tarea.nombre}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default QRC;
