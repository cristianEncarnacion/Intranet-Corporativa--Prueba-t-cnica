import { useEffect, useState } from "react";
import FormComponent from "./components/FormComponent";
import { LayoutAdmin } from "./LayoutAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import stylesComponent from "./components/styles/FormEmployee.module.css";

const FormEmployee = () => {
  const [values, setValues] = useState({
    nombre_usuario: "",
    contrasena: "",
    rol: "",
    departamento: "",
    nombre_completo: "",
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [roles, setRoles] = useState([]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const getDepartamentos = async () => {
    const response = await axios.get("http://localhost:3000/departamentos");
    setDepartamentos(response.data);
    console.log(response.data);
  };

  const getRoles = async () => {
    const response = await axios.get("http://localhost:3000/roles");
    setRoles(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getDepartamentos();
    getRoles();
  }, []);

  const fields = [
    {
      type: "text",
      name: "nombre_usuario",
      label: "Usuario",
      value: values.nombre_usuario,
      onChange,
    },
    {
      type: "password",
      name: "contrasena",
      label: "Contraseña",
      value: values.contrasena,
      onChange,
    },
    {
      type: "select",
      name: "rol",
      label: "Rol",
      value: values.rol,
      onChange,
      options: roles.map((role: any) => ({
        value: role.id,
        label: role.nombre,
      })),
    },
    {
      type: "select",
      name: "departamento",
      label: "Departamento",
      value: values.departamento,
      onChange,
      options: departamentos.map((dep: any) => ({
        value: dep.id,
        label: dep.nombre,
      })),
    },
    {
      type: "text",
      name: "nombre_completo",
      label: "Nombre completo",
      value: values.nombre_completo,
      onChange,
    },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      values.nombre_completo === "" ||
      values.nombre_usuario === "" ||
      values.contrasena === "" ||
      values.rol === "" ||
      values.departamento === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor llene todos los campos",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/empleados",
        values
      );
      console.log(response);

      if (response.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Empleado creado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setValues({
          nombre_usuario: "",
          contrasena: "",
          rol: "",
          departamento: "",
          nombre_completo: "",
        });
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error al crear el empleado. Intenta nuevamente.",
        });
      }
    }
  };

  return (
    <LayoutAdmin>
      <h1 className={stylesComponent.titulo}>Agregar empleado</h1>
      <FormComponent
        handleSubmit={handleSubmit}
        fields={fields}
        title="Crear"
      />
    </LayoutAdmin>
  );
};

export default FormEmployee;
