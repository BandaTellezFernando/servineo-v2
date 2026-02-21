import Link from "next/link";

export default function Home() {
  return (
    // Contenedor principal con padding para que no pegue a los bordes
    <div className="container mx-auto px-4 pt-4 pb-12 md:pt-8 md:pb-20 max-w-7xl">
      
      {/* Grid: 1 columna en celular, 2 columnas en PC (md:grid-cols-2) */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* === COLUMNA IZQUIERDA: Textos y Buscador === */}
        <div className="space-y-8">
          
          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-texto-oscuro leading-tight">
            Encuentra el <br />
            {/* El color azul resaltado */}
            <span className="text-primario">servicio</span> que <br />
            necesitas
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-primario md:text-xl max-w-lg">
            Conectamos clientes con proveedores de servicios profesionales. Desde reparaciones del hogar hasta servicios especializados.
          </p>

          {/* Buscador Inferior */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* Lupa Azul */}
                <svg className="w-5 h-5 text-primario" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="text" 
                placeholder="¿Qué servicio necesitas?" 
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white border-none focus:ring-2 focus:ring-servineo-300 outline-none text-texto-oscuro shadow-sm"
              />
            </div>
            <button className="bg-primario text-white px-6 py-3 rounded-lg font-semibold hover:bg-primario-hover transition-colors shadow-md whitespace-nowrap">
              Buscar FIXER
            </button>
          </div>

          {/* Estadísticas */}
          <div className="flex flex-wrap gap-8 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primario font-bold text-2xl mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <span>500+</span>
              </div>
              <p className="text-primario text-sm">FIXERS activos</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primario font-bold text-2xl mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>1,200+</span>
              </div>
              <p className="text-primario text-sm">Servicios completados</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primario font-bold text-2xl mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                <span>4.8</span>
              </div>
              <p className="text-primario text-sm text-center">Calificación<br/>promedio</p>
            </div>
          </div>

        </div>

        {/* === COLUMNA DERECHA: Tarjetas de Acción === */}
        <div className="flex flex-col gap-6">
          
          {/* Tarjeta Blanca: Buscar Servicio */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-servineo-100">
            <h3 className="text-xl font-bold text-texto-oscuro mb-3">¿Necesitas un servicio?</h3>
            <p className="text-primario mb-6">Encuentra el FIXER perfecto para tu proyecto en minutos.</p>
            <Link href="/servicios" className="block w-full text-center bg-primario text-white font-semibold py-3 rounded-lg hover:bg-primario-hover transition-colors shadow-sm">
              Explorar Servicios
            </Link>
          </div>

          {/* Tarjeta Azul: Ser Fixer */}
          <div className="bg-primario rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-white mb-3">¿Quieres ser FIXER?</h3>
            <p className="text-servineo-100 mb-6">Únete a nuestra comunidad y empieza a generar ingresos con tus habilidades.</p>
            <Link href="/registro-fixer" className="block w-full text-center bg-servineo-50 text-primario font-semibold py-3 rounded-lg hover:bg-white transition-colors shadow-sm">
              Registrarse como FIXER
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}