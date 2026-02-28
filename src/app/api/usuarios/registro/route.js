//src/app/api/usuarios/registro/route.js
import { NextResponse } from "next/server";
import conectarDB from "@/lib/mongodb"; // Tu archivo de conexión a la base de datos
import Usuario from "@/models/Usuario"; // El modelo seguro que acabamos de crear

export async function POST(request) {
  try {
    // 1. Abrimos la bóveda (Conectamos a MongoDB)
    await conectarDB();

    // 2. Extraemos los datos que nos envía el frontend (el formulario)
    const data = await request.json();
    const { nombreCompleto, ci, celular, correo, password, ubicacion } = data;

    // 3. VALIDACIÓN BÁSICA: Asegurarnos de que no falte nada
    if (!nombreCompleto || !ci || !celular || !correo || !password || !ubicacion) {
      return NextResponse.json(
        { mensaje: "Todos los campos son obligatorios" },
        { status: 400 } // 400 significa "Bad Request" (Petición incorrecta)
      );
    }

    // 4. EVITAR DUPLICADOS: Revisar si el correo o el CI ya existen
    const usuarioExistente = await Usuario.findOne({
      $or: [{ correo: correo }, { ci: ci }]
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { mensaje: "El correo o el Carnet de Identidad ya están registrados" },
        { status: 409 } // 409 significa "Conflict" (Conflicto de datos)
      );
    }

    // 5. CREAR EL USUARIO: Pasamos los datos al molde
    // Nota: ¡Aquí el Modelo Usuario.js se encarga de encriptar la contraseña automáticamente!
    const nuevoUsuario = new Usuario({
      nombreCompleto,
      ci,
      celular,
      correo,
      password,
      ubicacion
    });

    // Guardamos en la nube de MongoDB Atlas
    await nuevoUsuario.save();

    // ==========================================
    // 6. EL SELLO DE SEGURIDAD (Lo que le faltaba a tus compañeros)
    // ==========================================
    // Convertimos el resultado de la base de datos a un objeto de Javascript normal...
    const usuarioSeguro = nuevoUsuario.toObject();
    
    // ...¡Y borramos la contraseña antes de responder!
    // Esto no la borra de la base de datos, solo la borra del "paquete" que le enviamos de vuelta a la página web.
    delete usuarioSeguro.password;

    // 7. Responder con éxito
    return NextResponse.json(
      {
        mensaje: "Usuario registrado correctamente",
        usuario: usuarioSeguro // Mandamos los datos limpios y seguros
      },
      { status: 201 } // 201 significa "Created" (Creado con éxito)
    );

  } catch (error) {
    console.error("Error grave en el registro de usuario:", error);
    return NextResponse.json(
      { mensaje: "Error interno del servidor al registrar el usuario" },
      { status: 500 }
    );
  }
}