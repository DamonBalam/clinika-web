import { IActividadFisica } from './ActividadFisica';
import { IClinic } from './Clinic';
import { INutri } from './Nutri';
import { IObjetivo } from './Objetivo';

export interface ISuscripcion {
  id?: number | null;
  empieza: string | null;
  termina: string | null;
}
export interface IPaciente {
  id?: number | null;
  nombre: string;
  nombre_completo?: string;
  apellido_paterno: string;
  apellido_materno: string;
  registro_consumo?: string;
  sexo: string;
  estatura: number;
  email: string;
  telefono: number | null;
  fecha_nacimiento: string;
  alergias: string[];
  condiciones_medicas: string[];
  actividad_fisica_id: number | null;
  actividad_fisica?: IActividadFisica | null;
  objetivo_id: number | null;
  objetivo?: IObjetivo | null;
  cita?: { fecha: string };
  consultorio_id: number | null;
  nutricionista_id: number | null;
  consultorio?: IClinic | null;
  nutricionista?: INutri | null;
  suscripcion?: ISuscripcion | null;
  horas_dormidas?: string;
  medicinas?: string[];
  desordenes?: string[];
  historial?: string;
  lugar_residencia?: string;
  profesion?: string;
  num_identificacion?: string;
}

export interface IPacientePayload {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  email: string;
  telefono?: number | string | null;
  fecha_nacimiento: string;

  nutricionista_id?: number | null;
  consultorio_id?: number | null;

  estatura?: number | string;

  registro_consumo?: string;
  alergias?: string[];
  condiciones_medicas?: string[];
  medicinas?: string[];
  desordenes?: string[];

  historial?: string;
  horas_dormidas?: string;

  actividad_fisica_id: number | null;
  objetivo_id: number | null;

  num_identificacion?: string;
  profesion?: string;
  lugar_residencia?: string;

  /* NUEVOS */
  estado_civil_id?: number | null;
  consumo_agua_id?: number | null;
  tipo_fumador_id?: number | null;
  consumo_alcohol_id?: number | null;
  nivel_estres_id?: number | null;
}
export interface IPacienteResponse {
  id: number | null;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombre_completo?: string;
  sexo: string;
  email: string;
  telefono?: number | string | null;
  fecha_nacimiento: string;

  nutricionista_id?: number | null;
  consultorio_id?: number | null;

  estatura?: number | string;

  registro_consumo?: string;
  alergias?: string[];
  condiciones_medicas?: string[];
  medicinas?: string[];
  desordenes?: string[];

  historial?: string;
  horas_dormidas?: string;

  actividad_fisica_id: number | null;
  objetivo_id: number | null;

  num_identificacion?: string;
  profesion?: string;
  lugar_residencia?: string;

  /* NUEVOS */
  estado_civil_id?: number | null;
  consumo_agua_id?: number | null;
  tipo_fumador_id?: number | null;
  consumo_alcohol_id?: number | null;
  nivel_estres_id?: number | null;
}

export class Paciente implements IPaciente {
  id?: number | null;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  registro_consumo?: string;
  sexo: string;
  estatura: number;
  email: string;
  telefono: number | null;
  fecha_nacimiento: string;
  alergias: string[];
  condiciones_medicas: string[];
  actividad_fisica_id: number | null;
  actividad_fisica?: IActividadFisica | null;
  objetivo_id: number | null;
  objetivo?: IObjetivo | null;
  consultorio_id: number | null;
  nutricionista_id: number | null;
  consultorio?: IClinic | null;
  nutricionista?: INutri | null;
  suscripcion?: ISuscripcion | null;

  constructor(data: Paciente) {
    (this.id = data.id || null),
      (this.nombre = data.nombre || ''),
      (this.apellido_paterno = data.apellido_paterno || ''),
      (this.apellido_materno = data.apellido_materno || ''),
      (this.registro_consumo = data.registro_consumo || ''),
      (this.sexo = data.sexo || ''),
      (this.estatura = data.estatura || 0),
      (this.email = data.email || ''),
      (this.telefono = data.telefono || null),
      (this.fecha_nacimiento = data.fecha_nacimiento || ''),
      (this.alergias = data.alergias || []),
      (this.condiciones_medicas = data.condiciones_medicas || []),
      (this.actividad_fisica_id = data.actividad_fisica_id || null),
      (this.actividad_fisica = data.actividad_fisica || null),
      (this.objetivo_id = data.objetivo_id || null),
      (this.objetivo = data.objetivo || null),
      (this.consultorio_id = data.consultorio_id || null),
      (this.consultorio = data.consultorio || null),
      (this.nutricionista = data.nutricionista || null),
      (this.nutricionista_id = data.nutricionista_id || null),
      (this.suscripcion = data.suscripcion || null);
  }
}
