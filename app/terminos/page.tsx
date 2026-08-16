export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="pin-label text-copperLight">Legal</span>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-ink">
        Terminos y Condiciones
      </h1>
      <p className="mt-2 text-sm text-muted">
        Ultima actualizacion: {new Date().toLocaleDateString("es-AR")}
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 font-mono text-base text-ink">1. Datos que recopilamos</h2>
          <p>
            Al crear una cuenta en Junior Phone Academy recopilamos tu nombre,
            apellido, numero de celular, direccion de email y contraseña
            (almacenada de forma encriptada, nunca en texto plano). Si te
            registras con Google, tambien recibimos tu nombre y foto de
            perfil publica de esa cuenta.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">2. Para que usamos tus datos</h2>
          <p>
            Usamos tus datos unicamente para: darte acceso a los cursos que
            compres, hacer seguimiento de tu progreso dentro de la
            plataforma, contactarte por consultas relacionadas a tu cuenta o
            compra, y procesar los pagos a traves de Mercado Pago. No
            vendemos ni compartimos tus datos con terceros con fines
            publicitarios.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">3. Pagos</h2>
          <p>
            Los pagos se procesan a traves de Mercado Pago. Junior Phone
            Academy no almacena datos de tarjetas ni medios de pago; esa
            informacion es manejada directamente por Mercado Pago bajo sus
            propias politicas de seguridad.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">4. Aceptacion automatica al comprar</h2>
          <p>
            Al registrarte en la plataforma aceptas estos Terminos y
            Condiciones. Ademas, la compra de cualquier curso implica la
            aceptacion automatica de estos mismos terminos al momento de
            confirmarse el pago, sin necesidad de una confirmacion adicional.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">5. Acceso al contenido</h2>
          <p>
            El acceso a las clases (videos y material descargable) es
            personal e intransferible. No esta permitido compartir tu cuenta
            ni redistribuir el contenido de los cursos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-mono text-base text-ink">6. Tus derechos sobre tus datos</h2>
          <p>
            Podes solicitar en cualquier momento acceder, corregir o eliminar
            tus datos personales escribiendonos a traves de los canales de
            contacto de Junior Phone Academy.
          </p>
        </section>
      </div>
    </div>
  );
}