//src/models/Usuario.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema(
  {
    nombreCompleto: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
    },
    ci: {
      type: String,
      required: [true, "El Carnet de Identidad es obligatorio"],
      unique: true, // No pueden haber dos usuarios con el mismo CI
    },
    celular: {
      type: String,
      required: [true, "El número de celular es obligatorio"],
    },
    correo: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true, // El correo también debe ser único
      lowercase: true,
    },
    password: {
      type: String,
      // OJO: No le ponemos "required: true" aquí, porque si el usuario 
      // decide registrarse con Google, ¡no tendrá contraseña!
    },
    googleId: {
      type: String,
      // Aquí guardaremos el ID único que nos dé Google si decide usar esa opción
    },
    fotoPerfil: {
      type: String, // Guardará el enlace (URL) que nos da Cloudinary
      default: null, // Si el usuario no sube foto, se guarda como null
    },
    ubicacion: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    rol: {
      type: String,
      default: "cliente", // Por defecto todos son clientes, los Fixers tendrán otro rol
    },
  },
  {
    timestamps: true, // Crea automáticamente la fecha de registro (createdAt)
  }
);

// ==========================================
// LA MAGIA DE LA SEGURIDAD (Middleware Mongoose)
// ==========================================
// Justo ANTES de guardar el usuario en la base de datos, ejecutamos esta función:
UsuarioSchema.pre("save", async function (next) {
  // Si la contraseña no se ha modificado o no existe (ej. entró con Google), pasamos de largo
  if (!this.isModified("password") || !this.password) {
    return;
  }

  // Encriptamos la contraseña con un nivel de complejidad de 10 "vueltas" (salt)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Este método nos servirá después para el Login: Compara la contraseña que 
// escribe el usuario con la encriptada en la base de datos
UsuarioSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);