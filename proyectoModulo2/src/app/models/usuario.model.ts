/**
 * @description
 * Interfaz que define la estructura de datos para un usuario en el sistema.
 * Representa el modelo de datos para los clientes y administradores, permitiendo
 * gestionar perfiles, niveles de suscripción y credenciales de acceso de forma tipada.
 */
export interface UsuarioModel {

  /**
   * @description Identificador único y autoincremental del usuario en la base de datos.
   */
  id: number;

  /**
   * @description Número de documento de identidad oficial del usuario.
   */
  cedula: number;

  /**
   * @description Nombre(s) del usuario.
   */
  nombre: string;

  /**
   * @description Apellido(s) del usuario.
   */
  apellido: string;

  /**
   * @description Correo electrónico utilizado como identificador de inicio de sesión.
   */
  correo: string;

  /**
   * @description Contraseña de acceso al sistema (generalmente cifrada en el servidor).
   */
  contrasena: string;

  /**
   * @description Nivel de cuenta o rol asignado (ej. 'Admin', 'Normal', 'Premium', 'Concurrente').
   */
  tipoUsuario: string;

  /**
   * @description Valor o costo base asociado al tipo de usuario o su nivel de servicio.
   */
  tarifa: number;

}
