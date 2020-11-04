import React, { useState, useEffect } from "react";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import axios from "axios";

const baseUrl = "http://localhost:3002/tareas";

const columnas = [{ title: "Nombre Tarea", field: "nombre" }];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function ABMTareas(props) {
  const styles = useStyles();
  const [data, setData] = React.useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [TareaSeleccionado, setTareaSeleccionado] = useState({
    nombre: "",
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTareaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + TareaSeleccionado.id)
      .then((response) => {
        setData(data.filter((tareas) => tareas.id !== TareaSeleccionado.id));
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + "/" + TareaSeleccionado.id, TareaSeleccionado)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((tareas) => {
          if (tareas.id === TareaSeleccionado.id) {
            tareas.nombre = TareaSeleccionado.nombre;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    await axios
      .post(baseUrl, {
        nombre: TareaSeleccionado.nombre,
      })
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const seleccionarTarea = (tareas, caso) => {
    setTareaSeleccionado(tareas);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Esta seguro que desea eliminar al tareas{" "}
        <b>{TareaSeleccionado && TareaSeleccionado.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Gestion de Tareas de Sistema</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre Tarea"
        name="nombre"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Agregar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Tarea</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre Tarea"
        name="nombre"
        onChange={handleChange}
        value={TareaSeleccionado && TareaSeleccionado.nombre}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Modificar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  return (
    <div class="w-50 p-3">
      <Button onClick={() => abrirCerrarModalInsertar()}>Nueva Tarea</Button>
      <MaterialTable
        columns={columnas}
        icons={tableIcons}
        data={data}
        title="Gestion de Tareas de sistema"
        actions={[
          {
            icon: Edit,
            tooltip: "Editar Tarea",
            onClick: (event, rowData) => seleccionarTarea(rowData, "Editar"),
          },
          {
            icon: Delete,
            tooltip: "Eliminar tareas",
            onClick: (event, rowData) => seleccionarTarea(rowData, "Eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
        }}
      >
        {" "}
      </MaterialTable>

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default ABMTareas;
