//src/app/api/usuarios/registro/route.js
import { NextResponse } from "next/server";
import conectarDB from "@/lib/mongodb"; 
import Usuario from "@/models/Usuario"; 
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(request) {
  try {
    await conectarDB();

    const data = await request.formData();

    const nombres = data.get("nombres");
    const apellidos = data.get("apellidos")
    const ci = data.get("ci");
    const celular = data.get("celular");
    const correo = data.get("correo");
    const password = data.get("password");
    const direccion = data.get("direccion");
    const lat = data.get("lat");
    const lng = data.get("lng");
    const fotoPerfilArchivo = data.get("fotoPerfil");

    const nombreCompleto = `${nombres} ${apellidos}`.trim();

    if (!nombres || !apellidos || !ci || !celular || !correo || !password) {
      return NextResponse.json(
        { mensaje: "Todos los campos básicos son obligatorios" },
        { status: 400 }
      );
    }

    // EVITAR DUPLICADOS AHORA TAMBIÉN CON CI
    const usuarioExistente = await Usuario.findOne({ 
      $or: [{ correo: correo }, { ci: ci }] 
    });
    if (usuarioExistente) {
      return NextResponse.json(
        { mensaje: "El correo o CI ya están registrados" },
        { status: 409 } 
      );
    }

   
   let fotoUrlSegura = null; // Por defecto no hay foto

    // Verificamos si el usuario realmente subió un archivo
    if (fotoPerfilArchivo && fotoPerfilArchivo.size > 0) {
      // 1. Convertimos el archivo binario a un "Buffer" que Node.js pueda leer
      const bytes = await fotoPerfilArchivo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 2. Lo transformamos a un formato de texto Base64 (ideal para enviar por internet sin guardar en disco)
      const base64Image = `data:${fotoPerfilArchivo.type};base64,${buffer.toString("base64")}`;

      // 3. Subimos la imagen a Cloudinary en una carpeta llamada "servineo_perfiles"
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "servineo_perfiles",
      });

      // 4. Extraemos el link seguro que nos devuelve Cloudinary
      fotoUrlSegura = uploadResponse.secure_url;
    }


    const nuevoUsuario = new Usuario({
      nombreCompleto,
     ci: ci, // ¡GUARDAMOS EL CI REAL AQUÍ! 
      celular,
      correo,
      password,
      // === LA SOLUCIÓN ESTÁ AQUÍ ===
      // Le damos a MongoDB exactamente el objeto que exige tu modelo
      ubicacion: {
        direccion: direccion,
        lat: parseFloat(lat), // Convertimos el texto a número decimal
        lng: parseFloat(lng)  // Convertimos el texto a número decimal
      }, 
      fotoPerfil: fotoUrlSegura,
    });

    // Guardamos en la base de datos
    await nuevoUsuario.save();

    const usuarioSeguro = nuevoUsuario.toObject();
    delete usuarioSeguro.password;

    return NextResponse.json(
      {
        mensaje: "Usuario registrado correctamente",
        usuario: usuarioSeguro 
      },
      { status: 201 } 
    );

  } catch (error) {
    console.error("Error grave en el registro de usuario:", error);
    return NextResponse.json(
      { mensaje: "Error interno del servidor al registrar el usuario" },
      { status: 500 }
    );
  }
}