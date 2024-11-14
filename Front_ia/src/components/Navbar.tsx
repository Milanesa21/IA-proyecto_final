import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Ícono de barra de navegación

export const Navbar = () => {
  return (
    <header className="bg-blue-600 p-4 text-white flex items-center justify-between shadow-md">
      {/* Ícono para abrir/cerrar el Sidebar */}
      <div className="lg:hidden">
        <button>
          <FaBars size={24} />
        </button>
      </div>

      {/* Opciones de usuario en el Navbar */}
      <div className="hidden lg:flex ml-auto space-x-6">
        <Link to="/profile" className="hover:text-gray-200">
          Perfil
        </Link>
        <Link to="/settings" className="hover:text-gray-200">
          Configuración
        </Link>
        <Link to="/logout" className="hover:text-gray-200">
          Salir
        </Link>
      </div>
    </header>
  );
};
