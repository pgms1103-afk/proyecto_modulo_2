/**
 * @description
 * Interfaz que define la estructura de datos para un envío o paquete dentro del sistema.
 * Representa el modelo exacto que se intercambia con la API del backend para
 * crear, leer, actualizar y mostrar los registros de los envíos.
 */
export interface EnvioModel {
  /**
   * @description Identificador único y autoincremental del envío en la base de datos.
   */
  id: number;

  /**
   * @description Categoría o clasificación del paquete (ej. 'Alimenticio', 'Frágil', 'Electrónico').
   */
  tipoPaquete: string;

  /**
   * @description Breve descripción del contenido o detalles relevantes del paquete.
   */
  descripcion: string;

  /**
   * @description Peso físico del paquete, generalmente expresado en kilogramos (kg).
   */
  peso: number;

  /**
   * @description Dirección física completa hacia donde se dirige el envío.
   */
  direccionDestino: string;

  /**
   * @description Valor monetario o tarifa calculada para realizar el traslado del paquete.
   */
  costo: number;

  /**
   * @description Fecha y hora en la que el paquete inicia su ruta.
   */
  fechaEnvio: string;

  /**
   * @description Fecha y hora límite o estimada en la que el paquete debe llegar a su destino.
   */
  fechaEntrega: string;

  /**
   * @description Bandera que indica si el paquete logró ser entregado dentro del plazo establecido (`true`) o si sufrió retrasos (`false`).
   */
  entregaATiempo: boolean;
}
