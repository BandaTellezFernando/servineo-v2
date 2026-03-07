"use client";
import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página recargue al enviar el formulario
    
    if (!formData.correo || !formData.password) {
      return setError("Por favor ingresa tu correo y contraseña.");
    }
    
    try {
      setCargando(true);
      setError("");

      // Disparamos la petición al Backend
      const respuesta = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Aquí sí avisamos que enviamos texto JSON
        },
        body: JSON.stringify(formData), // Convertimos nuestros datos a texto plano
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || "Error al iniciar sesión");
      }

      // ¡SI LLEGA AQUÍ, EL LOGIN FUE UN ÉXITO!
      onLoginSuccess(data.usuario);
      console.log("¡Login exitoso!", data);
      onClose(); // Cerramos el modal
      
      // Le damos la bienvenida al usuario con su propio nombre extraído de la BD
      alert(`¡Bienvenido de vuelta, ${data.usuario.nombreCompleto}!`);

    } catch (err) {
      // Si la contraseña está mal o el correo no existe, mostramos el error rojo
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative flex flex-col p-8">
        
        {/* Botón de Cerrar (X) */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className="text-2xl font-bold text-center text-texto-oscuro mb-6">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-semibold border border-red-200 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Correo */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-texto-oscuro">Correo electrónico</label>
            <input 
              type="email" 
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
              placeholder="correo@ejemplo.com" 
              className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" 
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-texto-oscuro">Contraseña</label>
            <div className="relative">
              <input 
                type={mostrarPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="••••••••" 
                className="w-full p-3 pr-10 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" 
              />
              <button type="button" onClick={() => setMostrarPassword(!mostrarPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
            </div>
            {/* Link de Olvidaste contraseña */}
            <div className="text-right mt-1">
              <button type="button" className="text-sm text-gray-500 hover:text-primario transition-colors">¿Olvidaste tu contraseña?</button>
            </div>
          </div>

          {/* Botón Principal */}
          <button 
            type="submit" 
            disabled={cargando}
            className={`w-full text-white p-3 rounded-lg font-bold transition-colors shadow-md mt-2 flex items-center justify-center gap-2
              ${cargando ? 'bg-primario/70 cursor-not-allowed' : 'bg-primario hover:bg-primario-hover'}
            `}
          >
            {cargando ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 font-semibold tracking-wider">O CONTINÚA CON</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Continuar con Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes una cuenta? <button className="text-primario font-semibold hover:underline">Regístrate</button>
        </p>

      </div>
    </div>
  );
}