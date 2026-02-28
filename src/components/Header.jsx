//src/components/Header.jsx
"use client"; // NUEVO: Asegúrate de tener esto arriba del todo
import { useState } from "react"; // NUEVO: Importar useState
import Link from "next/link";
import RegistroModal from "./RegistroModal"; // NUEVO: Importar el Modal

export default function Header() {
  // NUEVO: Estado para saber si el modal está abierto o cerrado
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-servineo-100 py-4">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          
          {/* Logo y Buscador... (Aquí va tu código normal del logo y el input) */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-texto-oscuro">⚙️ servineo</h1>
            {/* ... el resto de tu buscador ... */}
          </div>

          {/* Botones de la derecha */}
          <div className="flex items-center gap-4">
            <button className="border border-gray-300 px-4 py-2 rounded-lg font-semibold text-texto-oscuro hover:bg-gray-50">
              Ser FIXER
            </button>
            <button className="flex items-center gap-2 text-texto-oscuro font-semibold hover:text-primario">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Iniciar Sesión
            </button>
            
            {/* NUEVO: Al hacer clic, cambiamos el estado a true para abrir el modal */}
            <button 
              onClick={() => setIsRegistroOpen(true)}
              className="bg-primario text-white px-6 py-2 rounded-lg font-bold hover:bg-primario-hover shadow-sm"
            >
              Registrarse
            </button>
          </div>

        </div>
      </header>

      {/* NUEVO: Inyectamos el Modal aquí. Le pasamos el estado y la función para cerrar */}
      <RegistroModal 
        isOpen={isRegistroOpen} 
        onClose={() => setIsRegistroOpen(false)} 
      />
    </>
  );
}