import { NextResponse } from "next/server";
import conectarDB from "@/lib/mongodb";
import Usuario from "@/models/Usuario";

export async function POST(request) {
  try {
    // 1. Conectamos a MongoDB
    await conectarDB();

    // 2. Extraemos los datos que el usuario escribió en el login
    // Como aquí no enviamos fotos, recibimos JSON puro, no FormData
    const body = await request.json();
    const { correo, password } = body;

    // 3. Validación básica
    if (!correo || !password) {
      return NextResponse.json(
        { mensaje: "Por favor, ingresa tu correo y contraseña" },
        { status: 400 }
      );
    }

    // 4. Buscar si el usuario existe en la base de datos por su correo
    const usuarioEncontrado = await Usuario.findOne({ correo: correo.toLowerCase() });
    
    // Si no existe, le damos un mensaje genérico por seguridad (para que los hackers no sepan qué falló)
    if (!usuarioEncontrado) {
      return NextResponse.json(
        { mensaje: "Correo o contraseña incorrectos" },
        { status: 401 } // 401 significa No Autorizado
      );
    }

    // 5. Verificar la contraseña encriptada
    // Llamamos a la función mágica que creaste en Usuario.js
    const passwordCorrecto = await usuarioEncontrado.compararPassword(password);

    if (!passwordCorrecto) {
      return NextResponse.json(
        { mensaje: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    // 6. ¡Éxito! El usuario es quien dice ser.
    // Le quitamos la contraseña antes de devolver sus datos al frontend por seguridad.
    const usuarioSeguro = usuarioEncontrado.toObject();
    delete usuarioSeguro.password;

    return NextResponse.json(
      { 
        mensaje: "¡Inicio de sesión exitoso!", 
        usuario: usuarioSeguro 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error grave en el login:", error);
    return NextResponse.json(
      { mensaje: "Error interno del servidor" },
      { status: 500 }
    );
  }
}