import { useState } from "react";
import stylesComponents from "./stylesComponents/Navbar.module.css";
import { RiAccountCircleFill } from "react-icons/ri";
import { CiMenuBurger, CiLogout } from "react-icons/ci";
import { IoHomeSharp } from "react-icons/io5";
import { MdPeopleAlt, MdAssignment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  rol: number;
};

const Navbar = ({ rol }: NavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Define the type for menu items
  type MenuItem = {
    path: string;
    label: string;
    icon: JSX.Element;
  };

  // Menú basado en roles
  const menuItems: { [key: number]: MenuItem[] } = {
    1: [
      { path: "/inicioAdmin", label: "Inicio", icon: <IoHomeSharp /> },
      { path: "/empleados", label: "Empleados", icon: <MdPeopleAlt /> },
      { path: "/asignaciones", label: "Asignaciones", icon: <MdAssignment /> },
    ],
    2: [
      { path: "/inicio-empleado", label: "Inicio", icon: <IoHomeSharp /> },
      {
        path: "/asignacion-empleado",
        label: "Asignaciones",
        icon: <MdAssignment />,
      },
    ],
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={stylesComponents.nav}>
      <div className={stylesComponents.menuIcon} onClick={toggleModal}>
        <CiMenuBurger />
      </div>
      <div className={stylesComponents.welcomeMessage}>
        {userEmail}
        <RiAccountCircleFill />
      </div>
      {isModalOpen && (
        <div className={stylesComponents.modal}>
          <div className={stylesComponents.modalContent}>
            <span className={stylesComponents.close} onClick={toggleModal}>
              &times;
            </span>
            <ul className={stylesComponents.list}>
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
              <button
                onClick={handleLogout}
                className={stylesComponents.logoutButton}
              >
                Salir
                <CiLogout />
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
