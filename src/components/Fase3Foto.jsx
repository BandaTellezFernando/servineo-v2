//src/components/Fase3Foto.jsx
"use client";
import { useState, useRef } from "react";
import Image from "next/image";
export default function Fase3Foto({ formData, setFormData, setPaso, setError, handleSubmitFinal, cargando }) {
  const fileInputRef = useRef(null); 
  const [fotoPreview, setFotoPreview] = useState(null); // La vista previa se dibuja solo aquí

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return setError("La imagen es muy pesada. El tamaño máximo es 5MB.");
      }
      setError("");
      setFormData({ ...formData, fotoPerfil: file });
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col">
      <p className="text-center text-gray-500 text-sm mb-8">Agrega una foto para personalizar tu perfil</p>
      
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
      />

      <div className="flex justify-center mb-8">
        <div onClick={triggerFileInput} className="w-40 h-40 rounded-full border-[6px] border-gray-100 bg-gray-50 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors shadow-sm overflow-hidden relative">
          {fotoPreview ? (
            // Reemplazamos <img> por <Image /> con sus reglas estrictas
            <Image 
              src={fotoPreview} 
              alt="Vista previa" 
              width={160} // El tamaño w-40 de Tailwind equivale a 160px
              height={160}
              className="w-full h-full object-cover" 
              unoptimized // ¡ESTA ES LA PALABRA MÁGICA! Le dice a Next.js que no la procese en el servidor
            />
          ) : (
            <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          )}
        </div>
      </div>

      <button onClick={triggerFileInput} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-texto-oscuro p-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm mb-10">
        <svg className="w-5 h-5 text-texto-oscuro" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        {fotoPreview ? "Cambiar foto" : "Subir foto"}
      </button>

      <div className="flex items-center gap-3">
        <button onClick={() => { setError(""); setPaso(2); }} className="w-1/2 p-3 border border-gray-300 bg-white rounded-lg font-bold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
          Atrás
        </button>
        <button 
          onClick={handleSubmitFinal} 
          disabled={cargando} // Bloquea el botón si está cargando
          className={`w-1/2 text-white p-3 rounded-lg font-bold transition-colors shadow-md flex items-center justify-center gap-2
            ${cargando ? 'bg-primario/70 cursor-not-allowed' : 'bg-primario hover:bg-primario-hover'}
          `}
        >
          {cargando ? (
            <>
              {/* Un pequeño icono de carga girando */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </>
          ) : (
            "Registrarse"
          )}
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">Puedes omitir este paso y agregar una foto más tarde</p>
    </div>
  );
}