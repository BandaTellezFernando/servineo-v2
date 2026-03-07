"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // NUEVO: Importamos el optimizador de imágenes
import RegistroModal from "./RegistroModal";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [usuarioActual, setUsuarioActual] = useState(null);

  const obtenerPrimerNombre = (nombreCompleto) => {
    return nombreCompleto.split(" ")[0];
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-servineo-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* === IZQUIERDA: LOGO === */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primario text-white p-1.5 rounded-lg flex items-center justify-center">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-texto-oscuro tracking-tight">servineo</span>
          </Link>

          {/* === CENTRO: BUSCADOR === */}
          <div className="flex-1 max-w-xl hidden md:block mx-4">
            <div className="relative flex items-center w-full h-10 rounded-lg bg-servineo-50 focus-within:ring-2 focus-within:ring-servineo-300 transition-shadow">
              <div className="grid place-items-center h-full w-12 text-servineo-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input className="peer h-full w-full outline-none text-sm text-texto-oscuro bg-transparent pr-2 placeholder-servineo-500" type="text" id="search" placeholder="Buscar servicios, categorías..." />
            </div>
          </div>

          {/* === DERECHA: BOTONES === */}
          <div className="flex items-center gap-3 md:gap-5">
            <button className="hidden sm:block px-4 py-2 border border-servineo-200 text-texto-oscuro rounded-lg font-medium hover:bg-servineo-50 transition-colors">
              Ser FIXER
            </button>

            {/* CONDICIONAL: ¿Hay usuario o es invitado? */}
            {usuarioActual ? (
              
              /* === VISTA DE USUARIO LOGUEADO === */
              <button className="bg-primario text-white pl-4 pr-1.5 py-1.5 rounded-full flex items-center gap-3 font-semibold hover:bg-primario-hover transition-colors shadow-sm">
                <span className="tracking-wide">{obtenerPrimerNombre(usuarioActual.nombreCompleto)}</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-texto-oscuro overflow-hidden border-2 border-transparent">
                  {usuarioActual.fotoPerfil ? (
                    
                    // USAMOS <Image> DE NEXT.JS
                    <Image 
                      src={usuarioActual.fotoPerfil} 
                      alt="Perfil" 
                      width={32} 
                      height={32}
                      className="w-full h-full object-cover" 
                    />

                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  )}
                </div>
              </button>

            ) : (

              /* === VISTA DE INVITADO === */
              <>
                <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-texto-oscuro font-medium hover:text-primario transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="hidden sm:block">Iniciar Sesión</span>
                </button>

                <button onClick={() => setIsRegistroOpen(true)} className="bg-primario text-white px-5 py-2 rounded-lg font-medium hover:bg-primario-hover transition-colors shadow-sm">
                  Registrarse
                </button>
              </>

            )}

          </div>
        </div>
      </header>

      {/* Modales */}
      <RegistroModal isOpen={isRegistroOpen} onClose={() => setIsRegistroOpen(false)} />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(usuario) => setUsuarioActual(usuario)} 
      />
    </>
  );
}