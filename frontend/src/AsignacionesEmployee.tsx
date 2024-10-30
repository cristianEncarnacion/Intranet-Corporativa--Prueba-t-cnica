// AsignacionesEmployee.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./components/styles/Asignaciones.module.css";
import { LayoutEmpleado } from "./LayoutEmpleado";
import { useAuth } from "./AuthContext"; // Importar el contexto de autenticación

const AsignacionesEmployee = () => {
  const { userId } = useAuth(); // Obtener el userId del contexto de autenticación
  const [asignaciones, setAsignaciones] = useState([]);
  const [search, setSearch] = useState("");

  const getAsignaciones = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/asignaciones-employee/${userId}`
      );
      setAsignaciones(response.data);
    } catch (err) {
      console.error("Error al obtener las asignaciones", err);
    }
  };

  useEffect(() => {
    getAsignaciones();
  }, [userId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = asignaciones.filter((asignacion: { Asignacion: string }) =>
      asignacion.Asignacion.toLowerCase().includes(value.toLowerCase())
    );
    setAsignaciones(filtered);
  };

  return (
    <LayoutEmpleado>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Mis Asignaciones</h1>

        <input
          type="text"
          placeholder="Buscar asignación"
          value={search}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asignación</th>
              <th>Fecha de Asignación</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map(
              (
                y: { Asignacion: string; fecha_asignacion: string; id: number },
                index
              ) => (
                <tr key={index} className={styles.row}>
                  <td>{y.Asignacion}</td>
                  <td>{new Date(y.fecha_asignacion).toLocaleDateString()}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </LayoutEmpleado>
  );
};

export default AsignacionesEmployee;
