import { NextResponse } from "next/server";
import conectarDB from "@/lib/mongodb";
import Usuario from "@/models/Usuario";

export async function GET() {
  try {
    // 1. Conectamos a la base de datos
    await conectarDB();

    // 2. El comando nuclear: deleteMany({}) borra TODOS los documentos de la colección
    const resultado = await Usuario.deleteMany({});

    // 3. Devolvemos un reporte de cuántos borramos
    return NextResponse.json(
      { 
        mensaje: "¡Limpieza extrema completada!",
        usuariosBorrados: resultado.deletedCount 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al limpiar la base de datos:", error);
    return NextResponse.json(
      { mensaje: "Hubo un error al intentar borrar los usuarios." },
      { status: 500 }
    );
  }
}