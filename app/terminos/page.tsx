export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="pin-label text-copperLight">Legal</span>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-ink">Terminos y Condiciones</h1>
      <p className="mt-2 text-sm text-muted">Ultima actualizacion: {new Date().toLocaleDateString("es-AR")}</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 font-mono text-base text-ink">1. Aceptacion de estos terminos</h2>
          <p>Al crear una cuenta o comprar un curso en Junior Phone Academy, aceptas estos Terminos y Condiciones en su totalidad. Si no estas de acuerdo, no debes utilizar la plataforma.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">2. Sobre el servicio</h2>
          <p>Junior Phone Academy ofrece cursos online sobre electronica, reparacion de celulares y otras tematicas relacionadas, compuestos por videos, material descargable (PDF) y seguimiento de progreso. El catalogo de cursos puede ampliarse con el tiempo.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">3. Registro y edad minima</h2>
          <p>Debes tener al menos 18 anos para crear una cuenta por tu cuenta propia. Si sos menor de edad, un padre, madre o tutor legal debe registrarse y autorizar el uso en tu nombre. Sos responsable de mantener la confidencialidad de tu contraseña y de toda actividad realizada desde tu cuenta.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">4. Licencia de uso del contenido</h2>
          <p>Al comprar un curso, se te otorga una licencia personal, no exclusiva e intransferible para acceder al contenido con fines de aprendizaje individual. No esta permitido: compartir tu cuenta con terceros, descargar y redistribuir los videos, revender el acceso al curso, ni publicar el material en otras plataformas. El contenido se licencia para tu uso, no se vende ni se transfiere su propiedad.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">5. Precios y pagos</h2>
          <p>Los precios se muestran en pesos argentinos (ARS) e incluyen los impuestos aplicables al momento de la compra. Los pagos se procesan a traves de Mercado Pago; Junior Phone Academy no almacena datos de tarjetas. Los precios pueden modificarse en cualquier momento sin previo aviso, pero el cambio no afecta a compras ya realizadas.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">6. Politica de reembolsos</h2>
          <p>Podes solicitar el reembolso de un curso dentro de las 48 horas posteriores a la compra, siempre que hayas visto menos del 10% del contenido total del curso (equivalente, como referencia, a un maximo de 1 o 2 clases segun la extension del curso). Pasado ese plazo de 48 horas, o superado ese porcentaje de avance, la compra no es reembolsable. Para solicitar un reembolso dentro del plazo permitido, escribinos por los canales de contacto de la plataforma.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">7. Datos que recopilamos y su uso</h2>
          <p>Recopilamos tu nombre, apellido, numero de celular, email y contraseña (encriptada) al registrarte. Si te registras con Google, recibimos tambien tu nombre y foto de perfil publica. Usamos estos datos exclusivamente para darte acceso a tus cursos, hacer seguimiento de tu progreso, contactarte por consultas relacionadas a tu cuenta o compra, y procesar pagos. No vendemos ni compartimos tus datos con terceros con fines publicitarios. Podes solicitar acceder, corregir o eliminar tus datos personales en cualquier momento escribiendonos.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">8. Aceptacion automatica al comprar</h2>
          <p>La compra de cualquier curso implica la aceptacion automatica de estos Terminos y Condiciones vigentes al momento de la compra, sin necesidad de una confirmacion adicional a la ya realizada durante el registro.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">9. Propiedad intelectual</h2>
          <p>Todo el contenido de los cursos (videos, PDFs, textos, disenos y marca "Junior Phone Academy") es propiedad de Junior Phone Academy o de sus autores originales, y esta protegido por las leyes de propiedad intelectual vigentes en Argentina. Ningun derecho sobre este contenido se transfiere al usuario, salvo la licencia de uso descrita en la Seccion 4.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">10. Conducta del usuario y suspension de cuenta</h2>
          <p>Nos reservamos el derecho de suspender o cancelar el acceso de un usuario, sin reembolso, en caso de: compartir su cuenta con terceros, intentar copiar o redistribuir el contenido, comportamiento fraudulento en los pagos, o uso indebido de la plataforma.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">11. Modificaciones al contenido y al servicio</h2>
          <p>Podemos actualizar, mejorar o modificar el contenido de un curso despues de tu compra (por ejemplo, agregar clases nuevas o corregir material existente) sin que esto genere derecho a reembolso. Tambien podemos agregar nuevos cursos al catalogo en cualquier momento.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">12. Limitacion de responsabilidad</h2>
          <p>El contenido de los cursos es exclusivamente educativo. Junior Phone Academy no garantiza resultados laborales, ingresos, ni la obtencion de empleo o clientes como consecuencia de haber tomado un curso. El uso de las tecnicas y herramientas ensenadas es responsabilidad del usuario, especialmente en tareas que involucren riesgo electrico o manipulacion de equipos.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">13. Cambios a estos terminos</h2>
          <p>Podemos modificar estos Terminos y Condiciones en cualquier momento. Los cambios entran en vigencia al publicarse en esta pagina. El uso continuado de la plataforma despues de un cambio implica su aceptacion.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">14. Ley aplicable</h2>
          <p>Estos Terminos y Condiciones se rigen por las leyes de la Republica Argentina. Cualquier controversia se resolvera ante los tribunales ordinarios de la ciudad de Cordoba, Argentina.</p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">15. Contacto</h2>
          <p>Ante cualquier consulta sobre estos terminos, podes contactarnos a traves de los canales de contacto disponibles en la plataforma o en nuestras redes sociales.</p>
        </section>
      </div>
    </div>
  );
}