import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./components/styles/Perfil.module.css";
import { useAuth } from "./AuthContext";
import { LayoutEmpleado } from "./LayoutEmpleado";

const Perfil = () => {
  const { userId } = useAuth();
  const [usuario, setUsuario] = useState({
    nombre_completo: "",
    descripcion: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUsuarioId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/perfil/${userId}`
        );
        setUsuario(response.data);
      } catch (err) {
        setError("Error al cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };

    getUsuarioId();
  }, [userId]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/perfil/${userId}`, {
        descripcion: usuario.descripcion,
      });

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Descripción actualizada correctamente",
        confirmButtonText: "Aceptar",
      });

      setIsEditing(false);
    } catch (err) {
      setError("Error al actualizar la descripción");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar la descripción",
        confirmButtonText: "Aceptar",
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <LayoutEmpleado>
      <div className={styles.container}>
        <h2 className={styles.title}>Perfil del Usuario</h2>
        <div className={styles.description}>
          <p>
            <strong>Nombre Completo:</strong> {usuario.nombre_completo}
          </p>
          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <textarea
                className={styles.input}
                value={usuario.descripcion}
                onChange={(e) =>
                  setUsuario({ ...usuario, descripcion: e.target.value })
                }
                rows={4}
                required
              />
              <div className={styles.buttons}>
                <button type="submit" className={styles.button}>
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p>
                <strong>Descripción:</strong> {usuario.descripcion}
              </p>
              <button
                type="button"
                className={styles.button}
                onClick={() => setIsEditing(true)}
              >
                Editar Descripción
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutEmpleado>
  );
};

export default Perfil;
