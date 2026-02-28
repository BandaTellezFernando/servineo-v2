"use client";
import { useState, useRef, useEffect } from "react"; // NUEVO 1: Importamos useEffect
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export default function RegistroModal({ isOpen, onClose }) {
  const [paso, setPaso] = useState(1);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmaPassword, setMostrarConfirmaPassword] = useState(false);

  const mapRef = useRef(null);
  // NUEVO 2: Creamos un "control remoto" para el mensaje de error
  const errorRef = useRef(null); 

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    celular: "",
    correo: "",
    password: "",
    confirmaPassword: "",
    direccion: "",
    lat: -17.3895, 
    lng: -66.1568,
  });

  const [error, setError] = useState("");

  // NUEVO 3: El efecto "mágico" que mueve la pantalla cuando hay un error
  useEffect(() => {
    if (error && errorRef.current) {
      // Si hay un error, haz scroll suavemente hasta que el mensaje quede en el centro de la vista
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]); // Se ejecuta cada vez que la variable "error" cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validarFase1 = () => {
    const { nombres, apellidos, celular, correo, password, confirmaPassword } = formData;
    if (!nombres || !apellidos || !celular || !correo || !password || !confirmaPassword) {
      return setError("Por favor, llena todos los campos.");
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
    setError("");
    setPaso(2);
  };

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

        setFormData({
          ...formData,
          lat: nuevaLat,
          lng: nuevaLng,
        });
        setError(""); 

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [nuevaLng, nuevaLat],
            zoom: 16,
            duration: 2000
          });
        }
      },
      (error) => {
        console.error(error);
        setError("No pudimos acceder a tu ubicación. Verifica los permisos de tu navegador.");
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative flex flex-col max-h-[90vh]">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

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

        <div className="overflow-y-auto px-8 pb-8 custom-scrollbar">
          
          {/* NUEVO 4: Enganchamos el control remoto (ref) a la cajita del error */}
          {error && (
            <div ref={errorRef} className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-semibold border border-red-200 mb-4">
              {error}
            </div>
          )}

          {/* ========================================= */}
          {/* FASE 1: Formulario de Datos               */}
          {/* ========================================= */}
          {paso === 1 && (
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
          )}

          {/* ========================================= */}
          {/* FASE 2: Ubicación / Mapa MapCN            */}
          {/* ========================================= */}
          {paso === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-center text-gray-500 text-sm mb-2">
                Necesitamos tu ubicación para conectarte con fixers cercanos
              </p>

              <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-inner border border-gray-200">
                <Map 
                  ref={mapRef}
                  theme="light"
                  initialViewState={{
                    longitude: formData.lng,
                    latitude: formData.lat,
                    zoom: 13
                  }}
                  className="w-full h-full"
                  onClick={(e) => {
                    setFormData({ ...formData, lat: e.lngLat.lat, lng: e.lngLat.lng });
                  }}
                >
                  <MapMarker 
                    longitude={formData.lng} 
                    latitude={formData.lat}
                    draggable={true}
                    onDragEnd={(e) => {
                      setFormData({ ...formData, lat: e.lat, lng: e.lng });
                    }}
                  >
                    <MarkerContent>
                      <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform -mt-10">
                        <svg className="w-10 h-10 text-primario drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
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
          )}

          {/* FASE 3 ... (se mantiene igual) */}
          {paso === 3 && (
            <div className="flex flex-col">
              <p className="text-center text-gray-500 text-sm mb-8">Agrega una foto para personalizar tu perfil</p>
              <div className="flex justify-center mb-8">
                <div className="w-40 h-40 rounded-full border-[6px] border-gray-100 bg-gray-50 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors shadow-sm">
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-texto-oscuro p-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm mb-10">
                <svg className="w-5 h-5 text-texto-oscuro" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Subir foto
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => { setError(""); setPaso(2); }} className="w-1/2 p-3 border border-gray-300 bg-white rounded-lg font-bold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                  Atrás
                </button>
                <button onClick={() => console.log("¡Registrar Usuario!", formData)} className="w-1/2 bg-primario text-white p-3 rounded-lg font-bold hover:bg-primario-hover transition-colors shadow-md">
                  Registrarse
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">Puedes omitir este paso y agregar una foto más tarde</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}