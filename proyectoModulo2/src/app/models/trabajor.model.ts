/**
 * @description
 * Interfaz que define la estructura de datos para un trabajador dentro del sistema.
 * Representa el modelo de datos utilizado para gestionar la información del personal,
 * facilitando el tipado fuerte en los servicios y componentes que manipulan
 * registros de empleados.
 */
export interface TrabajadorModel {

  /**
   * @description Identificador único del trabajador en la base de datos.
   */
  id: number;

  /**
   * @description Nombre completo del trabajador.
   */
  nombre: string;

  /**
   * @description Número de documento de identidad (Cédula) del trabajador.
   */
  cedula: number;

  /**
   * @description Número de contacto telefónico del trabajador.
   */
  telefono: number;

  /**
   * @description Dirección de correo electrónico del trabajador.
   */
  email: string;

  /**
   * @description Rol o posición asignada dentro de la empresa (ej. 'Administrador', 'Conductor', 'Manipulador').
   */
  cargo: string;
}
