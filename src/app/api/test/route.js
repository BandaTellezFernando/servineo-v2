//src/api/test/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Importamos tu archivo de conexión

export async function GET() {
  try {
    // Intentamos conectar a la base de datos
    await dbConnect();
    
    // Si funciona, devolvemos este mensaje de éxito
    return NextResponse.json({ 
      status: "Éxito", 
      mensaje: "¡Servineo se ha conectado a MongoDB Atlas perfectamente!" 
    });
    
  } catch (error) {
    // Si algo falla en tu .env.local, veremos el error aquí
    return NextResponse.json({ 
      status: "Error", 
      mensaje: "Fallo la conexión a la base de datos", 
      detalle: error.message 
    }, { status: 500 });
  }
}