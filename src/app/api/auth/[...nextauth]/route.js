import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import conectarDB from "@/lib/mongodb";
import Usuario from "@/models/Usuario";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Esta función se ejecuta justo cuando Google aprueba el login
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await conectarDB();
          
          // Buscamos si el correo de Google ya está en nuestra base de datos
          const usuarioExiste = await Usuario.findOne({ correo: user.email });

          if (!usuarioExiste) {
            // AQUÍ ESTÁ EL RETO: El usuario no existe.
            // No podemos guardarlo en MongoDB todavía porque le falta el CI y el Celular.
            // Por ahora, dejamos que NextAuth lo apruebe visualmente, pero en el Frontend
            // tendremos que detectar que le faltan datos y pedirselos.
            console.log("¡Usuario de Google nuevo! Faltan datos obligatorios para MongoDB.");
            return true; 
          }

          // Si el usuario ya existe, lo dejamos pasar sin problema
          return true;
        } catch (error) {
          console.error("Error conectando con la base de datos en NextAuth:", error);
          return false; // Bloquea el login si hay un error grave
        }
      }
      return true;
    },
    // Esta función nos permite pasar datos del usuario a la sesión del navegador
    async session({ session }) {
      await conectarDB();
      // Buscamos al usuario en la BD para sacar su ID y su Rol
      const usuarioDb = await Usuario.findOne({ correo: session.user.email });
      
      if (usuarioDb) {
        session.user.id = usuarioDb._id.toString();
        session.user.rol = usuarioDb.rol;
      }
      
      return session;
    }
  },
});

// NextAuth requiere que exportemos esto así para funcionar con el App Router
export { handler as GET, handler as POST };