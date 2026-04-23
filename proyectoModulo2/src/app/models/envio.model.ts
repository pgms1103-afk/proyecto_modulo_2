export interface EnvioModel {
  id: number;
  tipoPaquete: string;
  descripcion: string;
  peso: number;
  direccionDestino: string;
  costo: number;
  fechaEnvio: string;
  fechaEntrega: string;
  entregaATiempo: boolean;
}
