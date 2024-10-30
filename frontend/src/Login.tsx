// Login.tsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./components/styles/Login.module.css";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({
    nombre_usuario: "",
    contrasena: "",
  });
  const [error, setError] = useState("");

  const Focus = useRef<HTMLInputElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", values);
      console.log(response.data); // Imprimir la respuesta para depuración
      if (response.status === 200) {
        const { rol, token } = response.data.usuario; // Verifica que esto sea correcto
        login(token);
        if (rol === 1) {
          navigate("/admin");
        } else {
          navigate("/inicio-empleado");
        }
      }
    } catch (error) {
      setValues({ nombre_usuario: "", contrasena: "" });
      setError("Error al iniciar sesión");
    }
  };
  useEffect(() => {
    Focus.current?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Bienvenido</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            ref={Focus}
            type="text"
            name="nombre_usuario"
            placeholder="Usuario"
            value={values.nombre_usuario}
            onChange={onChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={values.contrasena}
            onChange={onChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Iniciar Sesión
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
