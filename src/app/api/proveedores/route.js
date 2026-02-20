//src/app/api/proveedores/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Proveedor from "@/models/Proveedor";

// Método POST: Para CREAR un nuevo Fixer (lo usará tu formulario de registro)
export async function POST(request) {
  try {
    await dbConnect();
    
    // Extraemos los datos que nos envía el frontend
    const body = await request.json();
    
    // Le decimos a Mongoose que cree el documento en la base de datos
    const nuevoFixer = await Proveedor.create(body);
    
    return NextResponse.json({ 
      status: "Éxito", 
      mensaje: "Fixer registrado correctamente",
      fixer: nuevoFixer 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      status: "Error", 
      mensaje: "No se pudo registrar el Fixer", 
      detalle: error.message 
    }, { status: 400 });
  }
}

// Método GET: Para OBTENER todos los Fixers (lo usará tu mapa interactivo)
export async function GET() {
  try {
    await dbConnect();
    const fixers = await Proveedor.find({});
    return NextResponse.json(fixers);
  } catch (error) {
    return NextResponse.json({ status: "Error", detalle: error.message }, { status: 500 });
  }
}