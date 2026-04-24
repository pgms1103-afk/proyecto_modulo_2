package co.edu.unbosque.paqueteriaproyecto.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Pruebas unitarias para la excepción personalizada {@link CorreoInvalidoException}.
 * <p>
 * Esta clase valida que la excepción encargada de gestionar errores relacionados
 * con el formato y la validez de las direcciones de correo electrónico funcione
 * según lo esperado. Se verifica la integridad del mensaje de error, su jerarquía
 * dentro de las excepciones de tiempo de ejecución y su capacidad para ser
 * lanzada y detectada.
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
 * @author Jose Manuel Cipagauta Toro
 * @version 2.0
 * @since 1.0
 */
@DisplayName("Pruebas unitarias – CorreoInvalidoException")
class CorreoInvalidoExceptionTest {

    /**
     * Verifica que el mensaje de error proporcionado al constructor se almacene
     * y recupere correctamente mediante {@link Throwable#getMessage()}.
     * <p>
     * Migrado: {@code Assert.assertEquals} → {@code assertEquals} estático de JUnit 5.
     * </p>
     */
    @Test
    @DisplayName("getMessage() devuelve el mensaje exacto pasado al constructor")
    void testCorreoInvalidoMensaje() {
        CorreoInvalidoException ex = new CorreoInvalidoException("Correo inválido");
        assertEquals("Correo inválido", ex.getMessage());
    }

    /**
     * Verifica que el mensaje no sea {@code null} cuando se pasa una cadena válida.
     */
    @Test
    @DisplayName("getMessage() no retorna null para un mensaje no nulo")
    void testCorreoInvalidoMensajeNoNulo() {
        CorreoInvalidoException ex = new CorreoInvalidoException("valor");
        assertNotNull(ex.getMessage());
    }

    /**
     * Verifica que una cadena vacía se conserve tal cual sin modificaciones.
     */
    @Test
    @DisplayName("getMessage() conserva cadena vacía sin modificarla")
    void testCorreoInvalidoMensajeVacio() {
        CorreoInvalidoException ex = new CorreoInvalidoException("");
        assertEquals("", ex.getMessage());
    }

    /**
     * Comprueba que la excepción sea una instancia de {@link RuntimeException},
     * lo que permite que sea tratada como una excepción no verificada (unchecked).
     * <p>
     * Migrado: {@code Assert.assertTrue(new CorreoInvalidoException("msg") instanceof RuntimeException)}
     * → {@code assertInstanceOf(RuntimeException.class, ex)}.
     * </p>
     */
    @Test
    @DisplayName("Es instancia de RuntimeException (unchecked)")
    void testCorreoInvalidoEsRuntimeException() {
        CorreoInvalidoException ex = new CorreoInvalidoException("msg");
        assertInstanceOf(RuntimeException.class, ex);
    }

    /**
     * Comprueba que la excepción sea también instancia de {@link Exception},
     * base de la jerarquía de excepciones de Java.
     */
    @Test
    @DisplayName("Es instancia de Exception (jerarquía base de Java)")
    void testCorreoInvalidoEsException() {
        CorreoInvalidoException ex = new CorreoInvalidoException("msg");
        assertInstanceOf(Exception.class, ex);
    }

    
    /**
     * Valida que la excepción sea lanzada y detectada por {@code assertThrows}.
     * <p>
     * Migrado: {@code @Test(expected = CorreoInvalidoException.class)}
     * → {@code assertThrows(CorreoInvalidoException.class, () -> ...)}.
     * </p>
     */
    @Test
    @DisplayName("assertThrows captura correctamente el lanzamiento")
    void testCorreoInvalidoSeLanza() {
        assertThrows(CorreoInvalidoException.class,
                () -> { throw new CorreoInvalidoException("test"); });
    }

    /**
     * Verifica que el mensaje se conserve íntegro después del lanzamiento
     * y de ser capturado por {@code assertThrows}.
     */
    @Test
    @DisplayName("El mensaje se conserva íntegro tras el lanzamiento")
    void testCorreoInvalidoMensajeTrasSeLanza() {
        CorreoInvalidoException ex = assertThrows(CorreoInvalidoException.class,
                () -> { throw new CorreoInvalidoException("Sin formato @dominio"); });
        assertEquals("Sin formato @dominio", ex.getMessage());
    }
}