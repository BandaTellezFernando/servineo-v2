//src/app/api/usuarios/login/route.js
import { NextResponse } from "next/server";
import conectarDB from "@/lib/mongodb";
import Usuario from "@/models/Usuario";
import jwt from "jsonwebtoken"; // La fábrica de tokens

export async function POST(request) {
  try {
    await conectarDB();

    // 1. Recibir los datos del formulario de Login
    const data = await request.json();
    const { correo, password } = data;

    // Validación básica
    if (!correo || !password) {
      return NextResponse.json(
        { mensaje: "Por favor, ingresa correo y contraseña" },
        { status: 400 }
      );
    }

    // 2. Buscar al usuario en la base de datos
    const usuarioEncontrado = await Usuario.findOne({ correo });

    if (!usuarioEncontrado) {
      // Por seguridad, siempre decimos "Credenciales inválidas", no "El correo no existe"
      return NextResponse.json(
        { mensaje: "Credenciales inválidas" },
        { status: 401 } // 401: Unauthorized
      );
    }

    // 3. Verificar si el usuario se registró con Google y no tiene contraseña
    if (!usuarioEncontrado.password) {
       return NextResponse.json(
        { mensaje: "Esta cuenta se registró con Google. Por favor, usa el botón de Google para iniciar sesión." },
        { status: 400 }
      );
    }

    // 4. Comparar las contraseñas (usando el método seguro que creamos en el Modelo)
    const passwordCorrecto = await usuarioEncontrado.compararPassword(password);

    if (!passwordCorrecto) {
      return NextResponse.json(
        { mensaje: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // ==========================================
    // 5. ¡EL USUARIO ES VÁLIDO! FABRICAMOS EL JWT
    // ==========================================
    
    // Qué información queremos guardar dentro del token (el "Payload")
    // OJO: Nunca guardes contraseñas aquí, solo IDs y roles.
    const payloadDelToken = {
      id: usuarioEncontrado._id,
      rol: usuarioEncontrado.rol,
      nombre: usuarioEncontrado.nombreCompleto // Opcional, útil para mostrar "Hola Fer" rápido
    };

    // Firmamos el token con nuestro secreto
    const token = jwt.sign(
      payloadDelToken, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" } // El token caduca en 7 días, luego tendrá que volver a loguearse
    );

    // 6. Limpiamos los datos del usuario antes de enviarlos (igual que en el registro)
    const usuarioSeguro = usuarioEncontrado.toObject();
    delete usuarioSeguro.password;

    // 7. Entregar el premio: El Token y los datos limpios
    return NextResponse.json(
      {
        mensaje: "Inicio de sesión exitoso",
        token: token, // ¡Aquí va la llave!
        usuario: usuarioSeguro
      },
      { status: 200 } // 200: OK
    );

  } catch (error) {
    console.error("Error en el login:", error);
    return NextResponse.json(
      { mensaje: "Error interno del servidor" },
      { status: 500 }
    );
  }
}