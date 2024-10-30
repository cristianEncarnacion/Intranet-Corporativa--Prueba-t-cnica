// Componente AsignacionesEmployee.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./components/styles/Asignaciones.module.css";
import { LayoutEmpleado } from "./LayoutEmpleado";

const AsignacionesEmployee = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el valor de búsqueda
  const [filteredAsignaciones, setFilteredAsignaciones] = useState([]); // Estado para las asignaciones filtradas

  const getAsignaciones = async () => {
    const response = await axios.get("http://localhost:3000/asignaciones");
    setAsignaciones(response.data);
    setFilteredAsignaciones(response.data); // Inicializar asignaciones filtradas
  };

  useEffect(() => {
    getAsignaciones();
  }, []);

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

  return (
    <LayoutEmpleado>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Asignaciones</h1>

        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar asignación o empleado"
          value={search}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asignación</th>
              <th>Empleado</th>
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
