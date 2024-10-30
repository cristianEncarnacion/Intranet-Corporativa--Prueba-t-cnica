import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DataEmployee from "./DataEmployee";
import FormEmployee from "./FormEmployee";
import Asignaciones from "./Asignaciones";
import InicioAdmin from "./InicioAdmin";
import PrivateRoute from "./PrivateRoute";
import InicioEmployee from "./InicioEmployee";
import AsignacionesEmployee from "./AsignacionesEmployee";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={<PrivateRoute element={<InicioAdmin />} />}
          />
          <Route
            path="/empleados"
            element={<PrivateRoute element={<DataEmployee />} />}
          />
          <Route
            path="/addEmployee"
            element={<PrivateRoute element={<FormEmployee />} />}
          />
          <Route
            path="/asignaciones"
            element={<PrivateRoute element={<Asignaciones />} />}
          />
          <Route
            path="/inicio-empleado"
            element={<PrivateRoute element={<InicioEmployee />} />}
          />
          <Route
            path="/asignacion-empleado"
            element={<PrivateRoute element={<AsignacionesEmployee />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
