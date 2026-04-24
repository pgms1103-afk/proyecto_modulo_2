package co.edu.unbosque.paqueteriaproyecto;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Configuración para permitir que la aplicación Spring Boot se ejecute como un WAR tradicional
 * en un contenedor de servlets externo (como Tomcat, Jetty o WildFly).
 * <p>
 * Esta clase extiende {@link SpringBootServletInitializer} y sobrescribe el método
 * {@link #configure(SpringApplicationBuilder)} para indicar cuál es la clase principal
 * de la aplicación ({@link PaqueteriaProyectoModuloApplication}).
 * </p>
 * <p>
 * Es necesaria únicamente cuando el proyecto se empaqueta como archivo **WAR** y se despliega
 * en un servidor de aplicaciones externo. Si se ejecuta con el servidor embebido de Spring Boot
 * (usando {@code java -jar}), esta clase no se utiliza.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see SpringBootServletInitializer
 * @see SpringApplicationBuilder
 * @see PaqueteriaProyectoModuloApplication
 */
public class ServletInitializer extends SpringBootServletInitializer {

    /**
     * Configura la aplicación Spring Boot para su ejecución en un contenedor de servlets.
     * <p>
     * Este método especifica la clase principal que contiene la anotación {@code @SpringBootApplication}
     * y que será usada para inicializar el contexto de la aplicación.
     * </p>
     *
     * @param application el builder que permite configurar la aplicación Spring Boot
     * @return el mismo builder configurado con la fuente principal de la aplicación
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(PaqueteriaProyectoModuloApplication.class);
    }
}
