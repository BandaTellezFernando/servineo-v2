"use client";
import Image from "next/image";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export default function PerfilModal({ isOpen, onClose, usuario }) {
  if (!isOpen || !usuario) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Contenedor principal del modal */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative flex flex-col p-6 md:p-8 max-h-[95vh] overflow-y-auto custom-scrollbar">
        
        {/* Botón de Cerrar (X) */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-1.5">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className="text-2xl font-bold text-center text-texto-oscuro mb-6">Mi Perfil</h2>

        {/* Foto de Perfil Central */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full border-4 border-primario p-1 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {usuario.fotoPerfil ? (
                <Image src={usuario.fotoPerfil} alt="Perfil" width={112} height={112} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              )}
            </div>
          </div>
        </div>

        {/* Cuadrícula de Datos y Mapa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* COLUMNA IZQUIERDA: Tarjetas de Información */}
          <div className="flex flex-col gap-4">
            
            {/* Nombre */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 text-primario p-3 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Nombre completo</p>
                <p className="font-bold text-texto-oscuro text-lg">{usuario.nombreCompleto}</p>
              </div>
            </div>

            {/* Correo */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 text-primario p-3 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
              <div className="overflow-hidden">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Correo electrónico</p>
                <p className="font-bold text-texto-oscuro text-lg truncate">{usuario.correo}</p>
              </div>
            </div>

            {/* Celular */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 text-primario p-3 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Celular</p>
                <p className="font-bold text-texto-oscuro text-lg">+591 {usuario.celular}</p>
              </div>
            </div>

            {/* Carnet de Identidad */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 text-primario p-3 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Carnet de Identidad</p>
                <p className="font-bold text-texto-oscuro text-lg">{usuario.ci}</p>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Ubicación Guardada */}
          <div className="flex flex-col bg-gray-50 p-5 rounded-3xl border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6 text-primario" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Ubicación guardada</p>
            </div>
            <p className="font-bold text-texto-oscuro text-lg mb-4">{usuario.ubicacion?.direccion}</p>
            
            {/* === CAMBIO AQUÍ: Usamos viewState en lugar de initialViewState === */}
            <div className="flex-1 w-full min-h-[250px] rounded-2xl overflow-hidden shadow-inner border border-gray-200 relative">
              <Map 
                theme="light" 
                viewState={{ 
                  longitude: usuario.ubicacion?.lng || -66.1568, 
                  latitude: usuario.ubicacion?.lat || -17.3895, 
                  zoom: 17 // Nivel de zoom perfecto para ver calles
                }} 
                className="w-full h-full" 
                interactive={false} 
              >
                <MapMarker longitude={usuario.ubicacion?.lng || -66.1568} latitude={usuario.ubicacion?.lat || -17.3895}>
                  <MarkerContent>
                    <div className="flex flex-col items-center -mt-8">
                      <svg className="w-10 h-10 text-primario drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>
            </div>
          </div>

        </div>

        {/* Botón de Editar Perfil */}
        <button className="mt-8 w-full border-2 border-primario text-primario font-bold py-3 rounded-full flex justify-center items-center gap-2 hover:bg-primario/5 transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          Editar Perfil
        </button>

      </div>
    </div>
  );
}