import React from "react";
import { Alert, Table } from "reactstrap";
import { render } from "@testing-library/react";

//https://reactstrap.github.io/components/tables/

function QRC(props) {
  const [Report, fetchReport] = React.useState([]);

  React.useEffect(() => {
    ObtenerDatos();
  }, []);

  const ObtenerDatos = async () => {
    const data = await fetch("http://localhost:3002/jornalesQR");
    const report = await data.json();

    const reducedReport = reduceJornales(report);

    fetchReport(reducedReport);
  };

  return (
    <div class="w-50 p-3">
      <h1>Resumen</h1>
      <div className="btn-group">
        <div className="btn btn-dark">Contratista</div>
        <div className="btn btn-dark">Obra</div>
        <div className="btn btn-dark">Rubro</div>
      </div>
      <Summary elements={Report} />

      <Detalle elements={Report} />
    </div>
  );
}

function Summary({ elements, filter }) {
  function createSummary() {
    var helper = {};

    var result = elements.reduce(function (r, o) {
      var key = o.contratista.id;

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
            <th>Contratista</th>
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

function reduceJornales(arr) {
  var helper = {};

  var result = arr.reduce(function (r, o) {
    var key = o.obra.id + "-" + o.contratista.id + "-" + o.tarea.id;

    if (!helper[key]) {
      helper[key] = Object.assign({}, o);
      r.push(helper[key]);
    } else {
      helper[key].total += o.total;
    }

    return r;
  }, []);

  return result;
}

export default QRC;
