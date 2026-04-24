package co.edu.unbosque.paqueteriaproyecto.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Pruebas unitarias para la excepción personalizada {@link PesoInvalidoException}.
 * <p>
 * Esta clase se encarga de validar el comportamiento de la excepción que gestiona
 * errores relacionados con la medición de carga, tales como pesos negativos,
 * valores nulos o que excedan la capacidad permitida del sistema de mensajería.
 * Se verifica la integridad del mensaje, su jerarquía de herencia y su correcto
 * lanzamiento.
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
 * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 2.0
 * @since 1.0
 */
@DisplayName("Pruebas unitarias – PesoInvalidoException")
class PesoInvalidoExceptionTest {


    /**
     * Verifica que el mensaje de error proporcionado al constructor se almacene
     * y recupere correctamente mediante {@link Throwable#getMessage()}.
     * <p>
     * Migrado: {@code Assert.assertEquals} → {@code assertEquals} estático de JUnit 5.
     * </p>
     */
    @Test
    @DisplayName("getMessage() devuelve el mensaje exacto pasado al constructor")
    void testPesoInvalidoMensaje() {
        PesoInvalidoException ex = new PesoInvalidoException("Peso negativo");
        assertEquals("Peso negativo", ex.getMessage());
    }

    /**
     * Verifica que el mensaje no sea {@code null} cuando se pasa una cadena válida.
     */
    @Test
    @DisplayName("getMessage() no retorna null para un mensaje no nulo")
    void testPesoInvalidoMensajeNoNulo() {
        PesoInvalidoException ex = new PesoInvalidoException("valor");
        assertNotNull(ex.getMessage());
    }

    /**
     * Verifica que una cadena vacía se conserve tal cual sin modificaciones.
     */
    @Test
    @DisplayName("getMessage() conserva cadena vacía sin modificarla")
    void testPesoInvalidoMensajeVacio() {
        PesoInvalidoException ex = new PesoInvalidoException("");
        assertEquals("", ex.getMessage());
    }

   
    /**
     * Comprueba que la excepción sea una instancia de {@link RuntimeException},
     * lo que permite que sea tratada como una excepción no verificada (unchecked)
     * dentro del flujo de cálculo de tarifas y envíos.
     * <p>
     * Migrado: {@code Assert.assertTrue(new PesoInvalidoException("msg") instanceof RuntimeException)}
     * → {@code assertInstanceOf(RuntimeException.class, ex)}.
     * </p>
     */
    @Test
    @DisplayName("Es instancia de RuntimeException (unchecked)")
    void testPesoInvalidoEsRuntimeException() {
        PesoInvalidoException ex = new PesoInvalidoException("msg");
        assertInstanceOf(RuntimeException.class, ex);
    }

    /**
     * Comprueba que la excepción sea también instancia de {@link Exception},
     * base de la jerarquía de excepciones de Java.
     */
    @Test
    @DisplayName("Es instancia de Exception (jerarquía base de Java)")
    void testPesoInvalidoEsException() {
        PesoInvalidoException ex = new PesoInvalidoException("msg");
        assertInstanceOf(Exception.class, ex);
    }


    /**
     * Valida que la excepción sea lanzada y detectada por {@code assertThrows}.
     * <p>
     * Migrado: {@code @Test(expected = PesoInvalidoException.class)}
     * → {@code assertThrows(PesoInvalidoException.class, () -> ...)}.
     * </p>
     */
    @Test
    @DisplayName("assertThrows captura correctamente el lanzamiento")
    void testPesoInvalidoSeLanza() {
        assertThrows(PesoInvalidoException.class,
                () -> { throw new PesoInvalidoException("test"); });
    }

    /**
     * Verifica que el mensaje se conserve íntegro después del lanzamiento
     * y de ser capturado por {@code assertThrows}.
     */
    @Test
    @DisplayName("El mensaje se conserva íntegro tras el lanzamiento")
    void testPesoInvalidoMensajeTrasSeLanza() {
        PesoInvalidoException ex = assertThrows(PesoInvalidoException.class,
                () -> { throw new PesoInvalidoException("Peso supera capacidad máxima"); });
        assertEquals("Peso supera capacidad máxima", ex.getMessage());
    }
}