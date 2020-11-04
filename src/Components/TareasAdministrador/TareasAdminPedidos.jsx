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
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import axios from "axios";

//https://material-table.com/#/
const baseUrl = "http://localhost:3002/pedidos";

const columnas = [
  { title: "Titulo", field: "titulo" },
  { title: "Fecha", field: "fecha", type: "date" },
  { title: "Estado", field: "estado" },
  { title: "Materiales?", field: "materiales", type: "boolean" },
  { title: "Obra", field: "obra.nombre" },
  { title: "Tarea", field: "tarea.nombre" },
  { title: "Requiriente", field: "requester.firstname" },
  { title: "Tipo", field: "requester.usrtype" },
];

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

function GestionesObraPedidos(props) {
  const styles = useStyles();
  const [data, setData] = React.useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [PedidoSeleccionado, setPedidoSeleccionado] = useState({
    id: "",
    titulo: "",
    detalle: "",
    fecha: "",
    estado: "",
    materiales: "",
    obra: {
      id: "",
      nombre: "",
    },
    tarea: {
      id: "",
      nombre: "",
    },
    requester: {
      id: "",
      firstname: "",
      usrtype: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + PedidoSeleccionado.id)
      .then((response) => {
        setData(data.filter((pedido) => pedido.id !== PedidoSeleccionado.id));
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + "/" + PedidoSeleccionado.id, PedidoSeleccionado)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((pedido) => {
          if (pedido.id === PedidoSeleccionado.id) {
            pedido.titulo = PedidoSeleccionado.titulo;
            pedido.detalle = PedidoSeleccionado.detalle;
            pedido.fecha = PedidoSeleccionado.fecha;
            pedido.estado = PedidoSeleccionado.estado;
            pedido.materiales = PedidoSeleccionado.materiales;
            pedido.obra = PedidoSeleccionado.obra;
            pedido.tarea = PedidoSeleccionado.tarea;
            pedido.requester = PedidoSeleccionado.requester;
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
        titulo: PedidoSeleccionado.titulo,
        detalle: PedidoSeleccionado.detalle,
        fecha: PedidoSeleccionado.fecha,
        estado: PedidoSeleccionado.estado,
        materiales: PedidoSeleccionado.materiales,
        obra: PedidoSeleccionado.obra,
        tarea: PedidoSeleccionado.tarea,
        requester: PedidoSeleccionado.requester,
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

  const seleccionarPedido = (pedido, caso) => {
    setPedidoSeleccionado(pedido);
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
    PlaylistAddCheckIcon: forwardRef((props, ref) => (
      <PlaylistAddCheckIcon {...props} ref={ref} />
    )),
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
        Esta seguro que desea dar por resuelto el pedido{" "}
        <b>{PedidoSeleccionado && PedidoSeleccionado.titulo}</b>y eliminarlo de
        sus pendientes?
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
      <h3>Gestion Pedidos de Obra</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre Pedido"
        name="firstname"
        onChange={handleChange}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Tipo"
        name="usrtype"
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
      <h3>Cambiar Estado del Pedido</h3>

      <br />
      <Paper elevation={3}>
        <h3>
          Titulo: <b>{PedidoSeleccionado.titulo}</b>
        </h3>
        <p></p>
        <h4>Detalle del pedido: </h4>
        <p>{PedidoSeleccionado.detalle}</p>
        <br />
      </Paper>

      <br />
      <br />
      <Select
        native
        label="Actualizar estado del pedido"
        value={PedidoSeleccionado && PedidoSeleccionado.estado}
        onChange={handleChange}
        name="estado"
      >
        <option value={"en curso"}>En curso</option>
        <option value={"pedido hecho"}>Pedido Hecho al Corralon</option>
        <option value={"en Camino"}>Pedido en camino</option>
        <option value={"sin pedir"}>Sin Pedir</option>
        <option value={"iniciado"}>Pedido iniciado</option>
      </Select>
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
    <div>
      <MaterialTable
        columns={columnas}
        icons={tableIcons}
        data={data}
        title="Gestion Pedidos de Obras"
        actions={[
          {
            icon: Edit,
            tooltip: "Ver detalle o cambiar estado",
            onClick: (event, rowData) => seleccionarPedido(rowData, "Editar"),
          },
          {
            icon: PlaylistAddCheckIcon,
            tooltip: "Dar pedido por resuelto",
            onClick: (event, rowData) => seleccionarPedido(rowData, "Eliminar"),
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

export default GestionesObraPedidos;
