//src/components/Fase1Datos.jsx
"use client";
import { useState } from "react";

export default function Fase1Datos({ formData, handleChange, setPaso, setError }) {
  // Estos estados visuales ahora viven solo aquí
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmaPassword, setMostrarConfirmaPassword] = useState(false);

  // La validación se queda aquí con sus propios datos
  const validarFase1 = () => {
    const { nombres, apellidos, ci, celular, correo, password, confirmaPassword } = formData;
    if (!nombres || !apellidos || !ci || !celular || !correo || !password || !confirmaPassword) {
      return setError("Por favor, llena todos los campos.");
    }const ciRegex = /^[0-9]{7,}$/;
    if (!ciRegex.test(ci)) {
      return setError("El Carnet de Identidad debe tener al menos 7 dígitos y ser solo números.");
    }
    if (celular.length !== 8) {
      return setError("El número de teléfono debe tener 8 dígitos.");
    }
    if (password !== confirmaPassword) {
      return setError("Las contraseñas no coinciden.");
    }
    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }
    setError(""); // Todo bien
    setPaso(2);   // Avanzamos a Fase 2
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Nombre(s)</label>
        <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Nombre(s)" className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Apellidos</label>
        <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Carnet de Identidad</label>
        <input 
          type="text" 
          name="ci" 
          value={formData.ci} 
          onChange={handleChange} 
          placeholder="Ej: 1234567" 
          className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" 
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Teléfono (8 dígitos)</label>
        <input type="tel" name="celular" maxLength={8} value={formData.celular} onChange={handleChange} placeholder="Teléfono (8 dígitos)" className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Correo electrónico</label>
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo electrónico" className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Contraseña</label>
        <div className="relative">
          <input type={mostrarPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" className="w-full p-3 pr-10 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
          <button type="button" onClick={() => setMostrarPassword(!mostrarPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-texto-oscuro">Confirma contraseña</label>
        <div className="relative">
          <input type={mostrarConfirmaPassword ? "text" : "password"} name="confirmaPassword" value={formData.confirmaPassword} onChange={handleChange} placeholder="Confirma contraseña" className="w-full p-3 pr-10 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
          <button type="button" onClick={() => setMostrarConfirmaPassword(!mostrarConfirmaPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </button>
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="text-sm text-gray-500">¿Ya tienes una cuenta? <button className="text-primario font-semibold hover:underline">Inicia sesión</button></p>
      </div>

      <div className="flex items-center my-2">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-3 text-xs text-gray-400 font-semibold tracking-wider">O CONTINÚA CON</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
        Registrarse con Google
      </button>

      <button onClick={validarFase1} className="w-full bg-primario text-white p-3 rounded-lg font-bold hover:bg-primario-hover transition-colors shadow-md mt-2">
        Continuar
      </button>
    </div>
  );
}