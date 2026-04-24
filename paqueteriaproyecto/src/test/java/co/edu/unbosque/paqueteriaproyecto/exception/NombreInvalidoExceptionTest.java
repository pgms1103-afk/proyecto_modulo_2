package co.edu.unbosque.paqueteriaproyecto.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Pruebas unitarias para la excepción personalizada {@link NombreInvalidoException}.
 * <p>
 * Esta clase valida que la excepción encargada de gestionar errores relacionados
 * con la validación de nombres (formatos incorrectos, campos vacíos o caracteres
 * no permitidos) funcione según lo esperado. Se verifica la integridad del
 * mensaje de error, su jerarquía de herencia y su correcto lanzamiento.
 * </p>
 * <p>
 * <strong>Migración JUnit 4 → JUnit 5 (Jupiter):</strong>
 * <ul>
 *   <li>{@code import org.junit.Test} → {@code import org.junit.jupiter.api.Test}</li>
 *   <li>{@code import org.junit.Assert} → {@code import static org.junit.jupiter.api.Assertions.*}</li>
 *   <li>{@code Assert.assertEquals} → {@code assertEquals} (estático importado)</li>
 *   <li>{@code Assert.assertTrue(x instanceof Y)} → {@code assertInstanceOf(Y.class, x)}</li>
 *   <li>{@code @Test(expected = X.class)} → {@code assertThrows(X.class, () -> ...)}</li>
 *   <li>La clase ya no necesita ser {@code public} en JUnit 5 (visibilidad package-private).</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 2.0
 * @since 1.0
 */
@DisplayName("Pruebas unitarias – NombreInvalidoException")
class NombreInvalidoExceptionTest {


    /**
     * Verifica que el mensaje de error proporcionado al constructor se almacene
     * y recupere correctamente mediante {@link Throwable#getMessage()}.
     * <p>
     * Migrado: {@code Assert.assertEquals} → {@code assertEquals} estático de JUnit 5.
     * </p>
     */
    @Test
    @DisplayName("getMessage() devuelve el mensaje exacto pasado al constructor")
    void testNombreInvalidoMensaje() {
        NombreInvalidoException ex = new NombreInvalidoException("Nombre vacío");
        assertEquals("Nombre vacío", ex.getMessage());
    }

    /**
     * Verifica que el mensaje no sea {@code null} cuando se pasa una cadena válida.
     */
    @Test
    @DisplayName("getMessage() no retorna null para un mensaje no nulo")
    void testNombreInvalidoMensajeNoNulo() {
        NombreInvalidoException ex = new NombreInvalidoException("valor");
        assertNotNull(ex.getMessage());
    }

    /**
     * Verifica que una cadena vacía se conserve tal cual sin modificaciones.
     */
    @Test
    @DisplayName("getMessage() conserva cadena vacía sin modificarla")
    void testNombreInvalidoMensajeVacio() {
        NombreInvalidoException ex = new NombreInvalidoException("");
        assertEquals("", ex.getMessage());
    }


    /**
     * Comprueba que la excepción sea una instancia de {@link RuntimeException},
     * permitiendo su uso como una excepción no verificada (unchecked) en la
     * capa de servicios o entidades.
     * <p>
     * Migrado: {@code Assert.assertTrue(new NombreInvalidoException("msg") instanceof RuntimeException)}
     * → {@code assertInstanceOf(RuntimeException.class, ex)}.
     * </p>
     */
    @Test
    @DisplayName("Es instancia de RuntimeException (unchecked)")
    void testNombreInvalidoEsRuntimeException() {
        NombreInvalidoException ex = new NombreInvalidoException("msg");
        assertInstanceOf(RuntimeException.class, ex);
    }

    /**
     * Comprueba que la excepción sea también instancia de {@link Exception},
     * base de la jerarquía de excepciones de Java.
     */
    @Test
    @DisplayName("Es instancia de Exception (jerarquía base de Java)")
    void testNombreInvalidoEsException() {
        NombreInvalidoException ex = new NombreInvalidoException("msg");
        assertInstanceOf(Exception.class, ex);
    }

   
    /**
     * Valida que la excepción sea lanzada y detectada por {@code assertThrows}.
     * <p>
     * Migrado: {@code @Test(expected = NombreInvalidoException.class)}
     * → {@code assertThrows(NombreInvalidoException.class, () -> ...)}.
     * </p>
     */
    @Test
    @DisplayName("assertThrows captura correctamente el lanzamiento")
    void testNombreInvalidoSeLanza() {
        assertThrows(NombreInvalidoException.class,
                () -> { throw new NombreInvalidoException("test"); });
    }

    /**
     * Verifica que el mensaje se conserve íntegro después del lanzamiento
     * y de ser capturado por {@code assertThrows}.
     */
    @Test
    @DisplayName("El mensaje se conserva íntegro tras el lanzamiento")
    void testNombreInvalidoMensajeTrasSeLanza() {
        NombreInvalidoException ex = assertThrows(NombreInvalidoException.class,
                () -> { throw new NombreInvalidoException("Nombre contiene números"); });
        assertEquals("Nombre contiene números", ex.getMessage());
    }
}