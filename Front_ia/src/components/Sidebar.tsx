import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRegComment, FaCog, FaUser, FaTrash } from "react-icons/fa";

export const Sidebar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el progreso

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Cargar archivos desde localStorage al iniciar el componente
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedPdfs")) || [];
    setPdfFiles(savedFiles);
  }, []);

  // Guardar la lista de archivos en localStorage
  const saveToLocalStorage = (files) => {
    localStorage.setItem("uploadedPdfs", JSON.stringify(files));
  };

  // Subir el archivo al backend
  const uploadPdf = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true); // Mostrar progreso
        const response = await fetch("http://127.0.0.1:8000/jorgito/upload/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message); // Mensaje de éxito
          const updatedFiles = [...pdfFiles, { name: file.name }];
          setPdfFiles(updatedFiles);
          saveToLocalStorage(updatedFiles);
        } else {
          alert("Error al subir el archivo");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Ocultar progreso
      }
    } else {
      alert("Por favor, selecciona un archivo PDF.");
    }
  };

// Eliminar un archivo PDF desde el backend
const handleDeletePdf = async (filename) => {
  try {
    setLoading(true); // Mostrar progreso
    const response = await fetch(`http://127.0.0.1:8000/jorgito/delete/?doc_name=${filename}`, {
      method: "POST",
    });    

    if (response.ok) {
      alert("Archivo y contexto eliminados con éxito");
      // Eliminar el archivo localmente
      const updatedFiles = pdfFiles.filter(file => file.name !== filename);
      setPdfFiles(updatedFiles);
      saveToLocalStorage(updatedFiles);
    } else {
      alert("Error al eliminar el archivo");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false); // Ocultar progreso
  }
};


  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-full bg-blue-600 text-white w-48 p-4 shadow-md transition-all duration-300">
        <Link to="/">
          <div className="text-xl font-bold mb-8">SeguChamba</div>
        </Link>
        <ul className="space-y-6">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 hover:bg-blue-700 p-3 rounded-lg"
            >
              <FaHome size={20} />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="/chats"
              className="flex items-center space-x-3 hover:bg-blue-700 p-3 rounded-lg"
            >
              <FaRegComment size={20} />
              <span>Chats</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-3 hover:bg-blue-700 p-3 rounded-lg"
            >
              <FaUser size={20} />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <button
              onClick={togglePopup}
              className="flex items-center space-x-3 hover:bg-blue-700 p-3 rounded-lg w-full text-left"
            >
              <FaCog size={20} />
              <span>Configuración</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-96 flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-4">Configuración</h2>

            {/* Sección para mostrar archivos PDF cargados */}
            <div className="flex-grow p-4 bg-gray-100 rounded-lg mb-4 overflow-y-auto">
              {pdfFiles.length > 0 ? (
                <ul>
                  {pdfFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white p-2 my-2 rounded shadow"
                    >
                      <span className="text-gray-700">{file.name}</span>
                      <button
                        onClick={() => handleDeletePdf(file.name)} // Eliminar archivo
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay archivos PDF cargados.</p>
              )}
            </div>

            {/* Input para cargar un archivo PDF */}
            <input
              type="file"
              accept="application/pdf"
              onChange={uploadPdf} // Subir archivo
              className="mb-4"
            />

            {/* Botones para agregar o cerrar */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={loading} // Deshabilitar si está cargando
              >
                {loading ? "Cargando..." : "Agregar"}
              </button>
              <button
                onClick={togglePopup}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
