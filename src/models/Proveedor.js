//src/models/proveedor.js
import mongoose from 'mongoose';

// 1. Sub-moldes para los horarios (Estos no crean colecciones nuevas, solo organizan los datos del fixer)
const RangoHorarioSchema = new mongoose.Schema({
  inicio: { type: String, required: true }, // Ejemplo: "08:00"
  fin: { type: String, required: true }     // Ejemplo: "18:00"
}, { _id: false });

const DiaLaboralSchema = new mongoose.Schema({
  dia: { type: Number, required: true }, // 1 al 7 (Lunes a Domingo)
  activo: { type: Boolean, default: false },
  rangos: [RangoHorarioSchema]
}, { _id: false });

const HorarioLaboralSchema = new mongoose.Schema({
  modo: { type: String, enum: ['diaria', 'semanal'], required: true },
  dias: [DiaLaboralSchema],
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const DisponibilidadSchema = new mongoose.Schema({
  dias: { type: [Number], required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  duracionTurno: { type: Number, required: true },
}, { _id: false });

// 2. El molde principal del Proveedor (Fixer)
const ProveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  password: { type: String, required: true },
  
  // En lugar de meter todo el servicio aquí, guardamos el ID para vincularlo a la colección "Servicio"
  servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }], 
  
  horarioLaboral: { type: HorarioLaboralSchema },
  disponibilidad: { type: DisponibilidadSchema, required: true },
  
  // ¡El motor del mapa! Aquí se guardan las coordenadas geográficas
  ubicacion: {
    lat: { type: Number },
    lng: { type: Number },
  },
}, { timestamps: true });

// Evitamos que Next.js recompile el modelo múltiples veces
const Proveedor = mongoose.models.Proveedor || mongoose.model('Proveedor', ProveedorSchema);

export default Proveedor;