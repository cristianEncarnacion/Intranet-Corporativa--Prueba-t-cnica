import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LayoutAdmin } from "./LayoutAdmin";
import styles from "./components/stylesComponents/DataEmployee.module.css";

const DataEmployee = () => {
  const navigate = useNavigate();

  interface Empleado {
    id: number;
    nombre_usuario: string;
    nombre_departamento: string;
  }

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const rowsToShow = 10;

  const getEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/empleados");
      const data = response.data;
      setEmpleados(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Seguro que deseas eliminar?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "El empleado ha sido eliminado.",
          icon: "success",
        });
        try {
          await axios.delete(`http://localhost:3000/empleados/${id}`);
          setEmpleados((prevEmpleados) =>
            prevEmpleados.filter((empleado) => empleado.id !== id)
          );
        } catch (error) {
          console.error("Error al eliminar el empleado:", error);
        }
      }
    });
  };

  const handleClick = () => {
    navigate("/addEmployee");
  };

  return (
    <LayoutAdmin>
      <h1 className={styles.titulo}>Empleados</h1>
      <button onClick={handleClick} className={styles.buttonAdd}>
        Agregar empleado
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Departamento</th>
              <th className={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.slice(0, rowsToShow).map((empleado) => (
              <tr key={empleado.id} className={styles.hover}>
                <td className={styles.td}>{empleado.id}</td>
                <td className={styles.td}>{empleado.nombre_usuario}</td>
                <td className={styles.td}>{empleado.nombre_departamento}</td>
                <td className={styles.td}>
                  <button
                    onClick={() => handleDelete(empleado.id)}
                    className={styles.buttonDelete}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </LayoutAdmin>
  );
};

export default DataEmployee;
