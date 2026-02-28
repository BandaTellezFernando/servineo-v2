import Hero from "@/components/Hero";
// Descomenta esta línea cuando quieras volver a agregar las categorías:
// import Categorias from "@/components/Categorias";

export default function Home() {
  return (
    <main>
      {/* 1. La sección principal de arriba */}
      <Hero />
      
      {/* 2. La sección de categorías de abajo (descoméntala cuando estés listo) */}
      {/* <Categorias /> */}
    </main>
  );
}