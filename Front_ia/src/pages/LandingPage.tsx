import "/public/css/pages/LandingPage.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Función para manejar el scroll y actualizar la sección activa
  const handleScroll = () => {
    const sections = document.querySelectorAll(".section");
    let currentSection = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSection = index;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para scroll hacia la sección correspondiente
  const scrollToSection = (index: number) => {
    const section = document.getElementById(`section-${index}`);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-cyan-400 text-white font-sans">
      {/* Barra lateral de puntos */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-10">
        {["section-0", "section-1", "section-2"].map((id, index) => (
          <div
            key={id}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 transform hover:scale-125 
              ${activeSection === index ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>

      {/* Sección de cabecera */}
      <header
        className="section relative min-h-screen bg-cover bg-center flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-indigo-700"
        style={{
          backgroundImage: `url('/public/css/stockin.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        id="section-0"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-6 md:px-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            SeguChamba
          </h1>
          <p className="text-lg md:text-xl mb-6 font-light">
            Tu asistente en seguridad e higiene laboral
          </p>
          <Link to="/chat">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105">
            Comienza Ahora
          </button>
            </Link>
        </div>
      </header>

      {/* Sección de características */}
      <section
        className="section min-h-screen bg-gradient-to-b from-blue-700 to-cyan-500 text-center flex items-center justify-center"
        id="section-1"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-white">
            ¿Por qué elegir SeguChamba?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div
              data-aos="fade-up"
              className="bg-white text-blue-600 p-8 rounded-xl shadow-lg opacity-0 transform translate-y-10"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Consultas en Tiempo Real
              </h3>
              <p>
                Obtén respuestas rápidas sobre seguridad laboral y prevención de
                riesgos.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white text-blue-600 p-8 rounded-xl shadow-lg opacity-0 transform translate-y-10"
            >
              <h3 className="text-2xl font-semibold mb-4">Asesoría 24/7</h3>
              <p>Asesoría a cualquier hora, siempre lista para ayudarte.</p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="bg-white text-blue-600 p-8 rounded-xl shadow-lg opacity-0 transform translate-y-10"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Actualización Continua
              </h3>
              <p>
                Información actualizada con normativas y prácticas de seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section
        className="section min-h-screen py-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-background text-center flex items-center justify-center"
        id="section-2"
      >
        <div className="text-center">
          <h2 className="text-9xl md:text-5xl font-semibold mb-4">
            ¡Únete a SeguChamba Hoy!
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            Mejora la seguridad en tu lugar de trabajo con asesoría profesional
            y siempre actualizada.
          </p>
          <Link to="/Register">
            <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Regístrate Gratis
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
