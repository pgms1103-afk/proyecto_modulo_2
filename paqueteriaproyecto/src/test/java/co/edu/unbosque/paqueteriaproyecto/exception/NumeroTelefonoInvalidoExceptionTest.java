package co.edu.unbosque.paqueteriaproyecto.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Pruebas unitarias para la excepción personalizada {@link NumeroTelefonoInvalidoException}.
 * <p>
 * Esta clase valida que la excepción encargada de gestionar errores relacionados
 * con la validación de números telefónicos (longitudes incorrectas, caracteres
 * no numéricos o campos vacíos) funcione según lo esperado. Se verifica la
 * integridad del mensaje de error, su jerarquía de herencia y su correcto lanzamiento.
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
@DisplayName("Pruebas unitarias – NumeroTelefonoInvalidoException")
class NumeroTelefonoInvalidoExceptionTest {

  
    /**
     * Verifica que el mensaje de error proporcionado al constructor se almacene
     * y recupere correctamente mediante {@link Throwable#getMessage()}.
     * <p>
     * Migrado: {@code Assert.assertEquals} → {@code assertEquals} estático de JUnit 5.
     * </p>
     */
    @Test
    @DisplayName("getMessage() devuelve el mensaje exacto pasado al constructor")
    void testNumeroTelefonoInvalidoMensaje() {
        NumeroTelefonoInvalidoException ex = new NumeroTelefonoInvalidoException("Teléfono inválido");
        assertEquals("Teléfono inválido", ex.getMessage());
    }

    /**
     * Verifica que el mensaje no sea {@code null} cuando se pasa una cadena válida.
     */
    @Test
    @DisplayName("getMessage() no retorna null para un mensaje no nulo")
    void testNumeroTelefonoInvalidoMensajeNoNulo() {
        NumeroTelefonoInvalidoException ex = new NumeroTelefonoInvalidoException("valor");
        assertNotNull(ex.getMessage());
    }

    /**
     * Verifica que una cadena vacía se conserve tal cual sin modificaciones.
     */
    @Test
    @DisplayName("getMessage() conserva cadena vacía sin modificarla")
    void testNumeroTelefonoInvalidoMensajeVacio() {
        NumeroTelefonoInvalidoException ex = new NumeroTelefonoInvalidoException("");
        assertEquals("", ex.getMessage());
    }

    
    /**
     * Comprueba que la excepción sea una instancia de {@link RuntimeException},
     * permitiendo su uso como una excepción no verificada (unchecked) en la
     * capa de servicios o en el registro de trabajadores y usuarios.
     * <p>
     * Migrado: {@code Assert.assertTrue(new NumeroTelefonoInvalidoException("msg") instanceof RuntimeException)}
     * → {@code assertInstanceOf(RuntimeException.class, ex)}.
     * </p>
     */
    @Test
    @DisplayName("Es instancia de RuntimeException (unchecked)")
    void testNumeroTelefonoInvalidoEsRuntimeException() {
        NumeroTelefonoInvalidoException ex = new NumeroTelefonoInvalidoException("msg");
        assertInstanceOf(RuntimeException.class, ex);
    }

    /**
     * Comprueba que la excepción sea también instancia de {@link Exception},
     * base de la jerarquía de excepciones de Java.
     */
    @Test
    @DisplayName("Es instancia de Exception (jerarquía base de Java)")
    void testNumeroTelefonoInvalidoEsException() {
        NumeroTelefonoInvalidoException ex = new NumeroTelefonoInvalidoException("msg");
        assertInstanceOf(Exception.class, ex);
    }

  
    /**
     * Valida que la excepción sea lanzada y detectada por {@code assertThrows}.
     * <p>
     * Migrado: {@code @Test(expected = NumeroTelefonoInvalidoException.class)}
     * → {@code assertThrows(NumeroTelefonoInvalidoException.class, () -> ...)}.
     * </p>
     */
    @Test
    @DisplayName("assertThrows captura correctamente el lanzamiento")
    void testNumeroTelefonoInvalidoSeLanza() {
        assertThrows(NumeroTelefonoInvalidoException.class,
                () -> { throw new NumeroTelefonoInvalidoException("test"); });
    }

    /**
     * Verifica que el mensaje se conserve íntegro después del lanzamiento
     * y de ser capturado por {@code assertThrows}.
     */
    @Test
    @DisplayName("El mensaje se conserva íntegro tras el lanzamiento")
    void testNumeroTelefonoInvalidoMensajeTrasSeLanza() {
        NumeroTelefonoInvalidoException ex = assertThrows(NumeroTelefonoInvalidoException.class,
                () -> { throw new NumeroTelefonoInvalidoException("Número con letras"); });
        assertEquals("Número con letras", ex.getMessage());
    }
}