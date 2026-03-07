//src/components/RegistroModal.jsx
"use client";
import { useState, useRef, useEffect } from "react";

// Importamos a los "Hijos" (que crearemos en el siguiente paso)
import Fase1Datos from "./Fase1Datos";
import Fase2Mapa from "./Fase2Mapa";
import Fase3Foto from "./Fase3Foto";

export default function RegistroModal({ isOpen, onClose }) {
  // 1. Estados Globales (El Cerebro)
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState("");
  const errorRef = useRef(null);

  // La memoria central con todos los datos del usuario
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    ci: "",
    celular: "",
    correo: "",
    password: "",
    confirmaPassword: "",
    direccion: "",
    lat: -17.3895, 
    lng: -66.1568,
    fotoPerfil: null, 
  });

  const [cargando, setCargando] = useState(false);
  
   const handleSubmitFinal = async () => {
    try {
      setCargando(true);
      setError("");

      // 1. Empaquetamos todo en FormData porque tenemos un archivo
      const datosParaEnviar = new FormData();
      datosParaEnviar.append("nombres", formData.nombres);
      datosParaEnviar.append("apellidos", formData.apellidos);
      datosParaEnviar.append("ci", formData.ci); // ¡LO AGREGAMOS AL PAQUETE!
      datosParaEnviar.append("celular", formData.celular);
      datosParaEnviar.append("correo", formData.correo);
      datosParaEnviar.append("password", formData.password);
      datosParaEnviar.append("direccion", formData.direccion);
      datosParaEnviar.append("lat", formData.lat);
      datosParaEnviar.append("lng", formData.lng);

      // Si el usuario subió una foto, la adjuntamos
      if (formData.fotoPerfil) {
        datosParaEnviar.append("fotoPerfil", formData.fotoPerfil);
      }

      // 2. Disparamos la petición a tu API de MongoDB
      const respuesta = await fetch("/api/usuarios/registro", {
        method: "POST",
        body: datosParaEnviar,
        // Nota Pro: NO se pone 'Content-Type': 'application/json' cuando usas FormData.
        // El navegador automáticamente pone el header 'multipart/form-data' correcto.
      });

      const data = await respuesta.json();

      // 3. Revisamos si el backend nos arrojó algún error (ej. "El correo ya existe")
      if (!respuesta.ok) {
        throw new Error(data.mensaje || "Error al registrar el usuario");
      }

      // 4. ¡Éxito absoluto!
      console.log("¡Usuario guardado en MongoDB!", data);
      
      // Cerramos el modal y opcionalmente podríamos limpiar el formulario
      onClose();
      alert("¡Cuenta creada con éxito en Servineo!"); // Luego podemos cambiar esto por una alerta más bonita

    } catch (err) {
      // Si algo falla, el Efecto de scroll que hicimos antes bajará la pantalla para mostrar este error
      setError(err.message);
    } finally {
      // Pase lo que pase, quitamos el estado de carga
      setCargando(false);
    }
  };


  // 2. Efecto para el scroll suave de errores
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  // 3. Función maestra para actualizar inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Borramos el error al teclear
  };

 

  // Si el modal está cerrado, no dibujamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative flex flex-col max-h-[90vh]">
        
        {/* Botón de Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Encabezado Dinámico y Barra de Progreso */}
        <div className="pt-8 pb-4 px-8 shrink-0">
          <h2 className="text-2xl font-bold text-center text-texto-oscuro mb-6">
            {paso === 1 ? "Crear cuenta" : paso === 2 ? "Ubicación" : "Foto de perfil"}
          </h2>
          <div className="flex justify-center gap-2 mb-2">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${paso >= 1 ? 'w-8 bg-primario' : 'w-8 bg-gray-100'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-300 ${paso >= 2 ? 'w-8 bg-primario' : 'w-8 bg-gray-100'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-300 ${paso >= 3 ? 'w-8 bg-primario' : 'w-8 bg-gray-100'}`}></div>
          </div>
        </div>

        {/* Área scrolleable donde inyectamos a los Hijos */}
        <div className="overflow-y-auto px-8 pb-8 custom-scrollbar">
          
          {/* Alerta de Error Global */}
          {error && (
            <div ref={errorRef} className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-semibold border border-red-200 mb-4">
              {error}
            </div>
          )}

          {/* Renderizado Condicional: El Padre decide qué Hijo mostrar y le "presta" sus datos */}
          {paso === 1 && (
            <Fase1Datos 
              formData={formData} 
              handleChange={handleChange} 
              setPaso={setPaso} 
              setError={setError} 
            />
          )}

          {paso === 2 && (
            <Fase2Mapa 
              formData={formData} 
              setFormData={setFormData} 
              handleChange={handleChange} 
              setPaso={setPaso} 
              setError={setError} 
            />
          )}

          {paso === 3 && (
            <Fase3Foto 
              formData={formData} 
              setFormData={setFormData} 
              setPaso={setPaso} 
              setError={setError} 
              handleSubmitFinal={handleSubmitFinal} 
              cargando={cargando}
            />
          )}

        </div>
      </div>
    </div>
  );
}