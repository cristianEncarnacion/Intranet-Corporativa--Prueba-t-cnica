import { useState } from "react";
import stylesComponents from "./stylesComponents/Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

type SidebarProps = {
  rol: number;
};

const Sidebar = ({ rol }: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems: {
    [key: number]: { path: string; label: string; icon: JSX.Element }[];
  } = {
    1: [
      // Admin
      { path: "/admin", label: "Inicio", icon: <IoHomeSharp /> },
      { path: "/empleados", label: "Empleados", icon: <MdPeopleAlt /> },
      { path: "/asignaciones", label: "Asignaciones", icon: <MdAssignment /> },
    ],
    2: [
      // Empleado
      { path: "/inicio-empleado", label: "Inicio", icon: <IoHomeSharp /> },
      {
        path: "/asignacion-empleado",
        label: "Asignaciones",
        icon: <MdAssignment />,
      },
      {
        path: "/perfil",
        label: "Perfil",
        icon: <CgProfile />,
      },
    ],
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className={`${stylesComponents.Sidebar} ${
        isModalOpen ? stylesComponents.hidden : ""
      }`}
    >
      <ul>
        {menuItems[rol]?.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => handleNavigation(item.path)}
              className={stylesComponents.menuButton}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className={stylesComponents.logoutButton}>
        Salir
        <CiLogout />
      </button>
    </div>
  );
};

export default Sidebar;
