const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectionToDb } = require("./db");
const userRoutes = require("./routes/user.router");
const empleadoRoutes = require("./routes/empleado.router");
const departamentoRoutes = require("./routes/department.router");
const rolesRoutes = require("./routes/roles.router");
const asignacionesRoutes = require("./routes/asignaciones.router");
const postsRoutes = require("./routes/posts.router");
const perfilRoutes = require("./routes/perfil.router");
const asignacionesEmployeeRoutes = require("./routes/asignacionesEmployee.router");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectionToDb();
app.use("/users", userRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/departamentos", departamentoRoutes);
app.use("/roles", rolesRoutes);
app.use("/asignaciones", asignacionesRoutes);
app.use("/posts", postsRoutes);
app.use("/perfil", perfilRoutes);
app.use("/asignaciones-employee", asignacionesEmployeeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
