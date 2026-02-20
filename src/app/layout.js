import "./globals.css";
// 1. Importamos el nuevo componente
import Header from "@/components/Header"; 

export const metadata = {
  title: "Servineo | Encuentra tu Fixer",
  description: "La plataforma de servicios profesionales en Cochabamba",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-fondo text-texto-oscuro antialiased min-h-screen flex flex-col">
        
        {/* 2. Usamos el componente Header que acabamos de crear */}
        <Header />

        {/* CONTENIDO DE LA PÁGINA */}
        <main className="grow">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-footer text-servineo-200 text-center py-6 mt-8 text-sm">
          <p>© 2026 Servineo. Todos los derechos reservados.</p>
        </footer>

      </body>
    </html>
  );
}