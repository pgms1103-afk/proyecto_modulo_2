package co.edu.unbosque.paqueteriaproyecto;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Clase principal de la aplicación Spring Boot para el módulo de paquetería.
 * <p>
 * Esta clase sirve como punto de entrada de la aplicación y habilita:
 * <ul>
 *   <li>Auto-configuración de Spring Boot</li>
 *   <li>Escaneo automático de componentes (controllers, services, repositories, etc.)</li>
 *   <li>Definición de beans globales como {@link ModelMapper}</li>
 * </ul>
 * La aplicación se inicia ejecutando el método {@link #main(String[])}.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see SpringApplication
 * @see ModelMapper
 */
@SpringBootApplication
public class PaqueteriaProyectoModuloApplication {

    /**
     * Punto de entrada principal de la aplicación Spring Boot.
     * <p>
     * Inicia el contexto de aplicación Spring Boot y carga todas las configuraciones
     * automáticas, componentes y beans definidos en el proyecto.
     * </p>
     *
     * @param args argumentos de línea de comandos (normalmente no utilizados en esta aplicación)
     */
    public static void main(String[] args) {
        SpringApplication.run(PaqueteriaProyectoModuloApplication.class, args);
    }

    /**
     * Proporciona una instancia de {@link ModelMapper} como bean gestionado por Spring.
     * <p>
     * ModelMapper se utiliza para realizar mapeos automáticos entre objetos DTO y entidades
     * (o viceversa), simplificando la conversión entre capas de la aplicación.
     * Esta instancia es singleton por defecto y se inyecta donde sea necesario mediante
     * {@code @Autowired}.
     * </p>
     *
     * @return una nueva instancia configurada de ModelMapper
     * @see ModelMapper
     */
    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }
}