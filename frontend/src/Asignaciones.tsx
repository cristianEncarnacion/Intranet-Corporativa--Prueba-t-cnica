// Componente Asignaciones.tsx

import FormComponent from "./components/FormComponent";
import { LayoutAdmin } from "./LayoutAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./components/styles/Asignaciones.module.css";

const Asignaciones = () => {
  const [values, setValues] = useState({
    asignacion: "",
    empleado_id: "",
  });

  const [empleados, setEmpleados] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el valor de búsqueda
  const [filteredAsignaciones, setFilteredAsignaciones] = useState([]); // Estado para las asignaciones filtradas

  const getEmpleados = async () => {
    const response = await axios.get(
      "http://localhost:3000/empleados/usuarios-con-departamento"
    );
    setEmpleados(response.data);
  };

  const getAsignaciones = async () => {
    const response = await axios.get("http://localhost:3000/asignaciones");
    setAsignaciones(response.data);
    setFilteredAsignaciones(response.data); // Inicializar las asignaciones filtradas
  };

  useEffect(() => {
    getEmpleados();
    getAsignaciones();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Filtrar asignaciones según la búsqueda por Asignación o Empleado
    const filtered = asignaciones.filter(
      (asignacion: { Asignacion: string; Empleado: string }) =>
        asignacion.Asignacion.toLowerCase().includes(value.toLowerCase()) ||
        asignacion.Empleado.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAsignaciones(filtered);
  };

  const fields = [
    {
      type: "text",
      name: "asignacion",
      label: "Ingrese la asignación",
      value: values.asignacion,
      onChange,
    },
    {
      type: "select",
      name: "empleado_id",
      label: "Empleado",
      value: values.empleado_id,
      onChange,
      options: empleados.map(
        (x: { nombre_usuario: string; nombre_completo: string }) => ({
          value: x.nombre_usuario,
          label: x.nombre_completo,
        })
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/asignaciones", values);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Asignación creada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setValues({ asignacion: "", empleado_id: "" });
      getAsignaciones();
    } catch (error) {
      console.error("Error al crear la asignación:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/asignaciones/${id}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Asignación eliminada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      getAsignaciones();
    } catch (error) {
      console.error("Error al eliminar la asignación:", error);
    }
  };

  return (
    <LayoutAdmin>
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar asignación o empleado"
        value={search}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      <h1 className={styles.titulo}>Asignaciones</h1>
      <div className={styles.container}>
        <FormComponent
          fields={fields}
          handleSubmit={handleSubmit}
          title="Asignar"
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asignación</th>
              <th>Empleado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAsignaciones.map(
              (
                y: { Asignacion: string; Empleado: string; id: number },
                index
              ) => (
                <tr key={index} className={styles.row}>
                  <td>{y.Asignacion}</td>
                  <td>{y.Empleado}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(y.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </LayoutAdmin>
  );
};

export default Asignaciones;
