"use client";
import { useState, useEffect } from "react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export default function MapaPerfil({ lat, lng }) {
  const [listoParaDibujar, setListoParaDibujar] = useState(false);

  // Mantenemos la pequeña pausa para que el modal se abra sin asustar al mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setListoParaDibujar(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!listoParaDibujar) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
        <svg className="animate-spin h-8 w-8 text-primario mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-400 font-medium text-sm">Cargando ubicación...</span>
      </div>
    );
  }

  return (
    <Map 
      theme="light" 
      // === LA SOLUCIÓN DEFINITIVA ===
      // MapLibreGL usa 'center' y 'zoom' directo, no initialViewState
      center={[lng, lat]} 
      zoom={18} 
      className="w-full h-full" 
    >
      <MapMarker longitude={lng} latitude={lat}>
        <MarkerContent>
          <div className="flex flex-col items-center -mt-8">
            <svg className="w-10 h-10 text-primario drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
        </MarkerContent>
      </MapMarker>
    </Map>
  );
}