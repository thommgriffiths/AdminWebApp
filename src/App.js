import React from "react";

//https://material-ui.com/es/components/box/
//https://reactstrap.github.io/components/alerts/
//https://getbootstrap.com/docs/4.0/utilities/borders/

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Inicio from "./Components/Inicio";
import Notificaciones from "./Components/Notificaciones";

import Consultas from "./Components/Consultas";
import QRC from "./Components/QRC";

import AdmSistema from "./Components/AdministracionSistema/AdmSistema";
import ABMTareas from "./Components/AdministracionSistema/ABMTareas";
import ABMUsuarios from "./Components/AdministracionSistema/ABMUsuarios";
import ABMObras from "./Components/AdministracionSistema/ABMObras";

import TareasAdmin from "./Components/TareasAdministrador/TareasAdmin";
import TareasAdminPedidos from "./Components/TareasAdministrador/TareasAdminPedidos";
import TareasAdminQuery from "./Components/TareasAdministrador/TareasAdminQuery";
import TareasAdminReembolsos from "./Components/TareasAdministrador/TareasAdminReembolsos";

import GestionesObra from "./Components/GestionesObra/GestionesObra";
import SeleccionObra from "./Components/GestionesObra/SeleccionObra";
//import ABMTareas from "./Components/GestionesObra/ABMTareas";
import PedidosObra from "./Components/GestionesObra/PedidosObra";
import TareasEnCurso from "./Components/GestionesObra/TareasEnCurso";

import GestionesCliente from "./Components/GestionesCliente/GestionesCliente";
import GClienteCatalogo from "./Components/GestionesCliente/GClienteCatalogo";
import GClienteDesiciones from "./Components/GestionesCliente/GClienteDesiciones";
import GClienteNotificaciones from "./Components/GestionesCliente/GClienteNotificaciones";

function App() {
  return (
    <Router>
      <div className="Container mt-5 ml-5 mr-5">
        <h1>Aplicacion Arquitectura</h1>

        <div className="btn-group">
          <Link to="/" className="btn btn-dark">
            Inicio
          </Link>
          <Link to="/QuickReport" className="btn btn-dark">
            QRC
          </Link>
          <Link to="/notificaciones" className="btn btn-dark">
            Notificaciones
          </Link>
          <Link to="/tareasadmin" className="btn btn-dark">
            Tareas Administrador
          </Link>
          <Link to="/AdministracionSistema" className="btn btn-dark">
            AdmSistema
          </Link>
        </div>
        <hr />
        <Switch>
          <Route path="/notificaciones">
            <Notificaciones />
          </Route>
        </Switch>

        <Switch>
          <Route path="/QuickReport">
            <QRC />
          </Route>
        </Switch>

        <Switch>
          <Route path="/Consultas">
            <Consultas />
          </Route>
        </Switch>
        <Switch>
          <Route path="/AdministracionSistema">
            <AdmSistema />
          </Route>
        </Switch>
        <Switch>
          <Route path="/AdministracionSistema/ABMTareas">
            <ABMTareas />
          </Route>
        </Switch>
        <Switch>
          <Route path="/AdministracionSistema/ABMUsuarios">
            <ABMUsuarios />
          </Route>
        </Switch>
        <Switch>
          <Route path="/AdministracionSistema/ABMObras">
            <ABMObras />
          </Route>
        </Switch>

        <Switch>
          <Route path="/SeleccionObra">
            <SeleccionObra />
          </Route>
        </Switch>

        <Switch>
          <Route path="/MenuObras">
            <GestionesObra />
          </Route>
        </Switch>

        <Switch>
          <Route path="/MenuObras/pedidos">
            <PedidosObra />
          </Route>
        </Switch>

        <Switch>
          <Route path="/MenuObras/ABMTareas">
            <ABMTareas />
          </Route>
        </Switch>

        <Switch>
          <Route path="/MenuObras/TareasEnCurso">
            <TareasEnCurso />
          </Route>
        </Switch>

        <Switch>
          <Route path="/tareasadmin">
            <TareasAdmin />
          </Route>
        </Switch>

        <Switch>
          <Route path="/tareasAdmin/Pedidos">
            <TareasAdminPedidos />
          </Route>
        </Switch>

        <Switch>
          <Route path="/tareasAdmin/Query">
            <TareasAdminQuery />
          </Route>
        </Switch>

        <Switch>
          <Route path="/tareasAdmin/Reembolsos">
            <TareasAdminReembolsos />
          </Route>
        </Switch>

        <Switch>
          <Route path="/MenuClientes">
            <GestionesCliente />
          </Route>
        </Switch>
        <Switch>
          <Route path="/MenuClientes/Catalogo">
            <GClienteCatalogo />
          </Route>
        </Switch>
        <Switch>
          <Route path="/MenuClientes/Desiciones">
            <GClienteDesiciones />
          </Route>
        </Switch>
        <Switch>
          <Route path="/MenuClientes/Notificaciones">
            <GClienteNotificaciones />
          </Route>
        </Switch>

        <Switch>
          <Route path="/" exact>
            <QRC />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
