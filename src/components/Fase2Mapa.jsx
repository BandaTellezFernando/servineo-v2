//src/components/Fase2Mapa.jsx
"use client";
import { useRef } from "react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export default function Fase2Mapa({ formData, setFormData, handleChange, setPaso, setError }) {
  const mapRef = useRef(null); // El control remoto del mapa vive aquí ahora

  const validarFase2 = () => {
    if (!formData.direccion.trim()) {
      return setError("Por favor, escribe una dirección de referencia.");
    }
    setError("");
    setPaso(3);
  };

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      return setError("Tu navegador no soporta geolocalización.");
    }
    setError("Buscando tu ubicación..."); 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nuevaLat = position.coords.latitude;
        const nuevaLng = position.coords.longitude;
        setFormData({ ...formData, lat: nuevaLat, lng: nuevaLng });
        setError(""); 
        if (mapRef.current) {
          mapRef.current.flyTo({ center: [nuevaLng, nuevaLat], zoom: 16, duration: 2000 });
        }
      },
      (error) => {
        console.error(error);
        setError("No pudimos acceder a tu ubicación. Verifica los permisos de tu navegador.");
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-gray-500 text-sm mb-2">Necesitamos tu ubicación para conectarte con fixers cercanos</p>
      
      <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-inner border border-gray-200">
        <Map ref={mapRef} theme="light" initialViewState={{ longitude: formData.lng, latitude: formData.lat, zoom: 13 }} className="w-full h-full" onClick={(e) => { setFormData({ ...formData, lat: e.lngLat.lat, lng: e.lngLat.lng }); }}>
          <MapMarker longitude={formData.lng} latitude={formData.lat} draggable={true} onDragEnd={(e) => { setFormData({ ...formData, lat: e.lat, lng: e.lng }); }}>
            <MarkerContent>
              <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform -mt-10">
                <svg className="w-10 h-10 text-primario drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
            </MarkerContent>
          </MapMarker>
        </Map>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label className="text-sm font-bold text-texto-oscuro">Dirección</label>
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Ej: Av. Blanco Galindo Km 4, casa verde" className="w-full p-3 rounded-lg border border-gray-300 text-texto-oscuro focus:outline-none focus:ring-2 focus:ring-primario focus:border-primario transition-all shadow-sm" />
      </div>

      <button type="button" onClick={obtenerUbicacion} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-texto-oscuro p-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
        <svg className="w-5 h-5 text-texto-oscuro" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        Usar mi ubicación actual
      </button>

      <div className="flex items-center gap-3 mt-4">
        <button onClick={() => { setError(""); setPaso(1); }} className="w-1/2 p-3 border border-gray-300 bg-white rounded-lg font-bold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
          Atrás
        </button>
        <button onClick={validarFase2} className="w-1/2 bg-primario text-white p-3 rounded-lg font-bold hover:bg-primario-hover transition-colors shadow-md">
          Continuar
        </button>
      </div>
    </div>
  );
}