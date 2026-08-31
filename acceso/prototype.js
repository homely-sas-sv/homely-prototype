/* Navegación del prototipo HOMELY SAS: solo conecta vistas locales. */
(() => {
  function applicationRoot() {
    const url = new URL(window.location.href);
    const pathParts = decodeURIComponent(url.pathname).split('/').filter(Boolean);
    const githubPages = url.hostname.endsWith('.github.io');
    const folderIndex = pathParts.findIndex((part) => part.toLowerCase().includes('homely'));

    if (githubPages) {
      // GitHub Pages de un proyecto siempre empieza con el nombre del repositorio.
      // No usar la carpeta de la vista actual evita rutas como /cliente/cliente/...
      const repositoryName = pathParts[0];
      url.pathname = repositoryName ? `/${repositoryName}/` : '/';
    } else if (folderIndex >= 0) {
      url.pathname = `/${pathParts.slice(0, folderIndex + 1).join('/')}/`;
    } else {
      url.pathname = '/';
    }
    url.search = '';
    url.hash = '';
    return url;
  }

  const root = applicationRoot();
  const navigationScript = document.createElement('script');
  navigationScript.src = new URL('navigation.js?v=20260831-3', root).href;
  document.head.appendChild(navigationScript);
  const current = decodeURIComponent(window.location.pathname).split('/').pop();
  const inClient = decodeURIComponent(window.location.pathname).includes('/cliente/');
  const inTechnician = decodeURIComponent(window.location.pathname).includes('/tecnico/');
  const targetUrl = (target) => new URL(target, root).href;
  const textOf = (element) => (element.textContent || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('es');

  function destination(label) {
    if (label === 'homely') return 'index.html';
    if (/iniciar sesión|iniciar sesion/.test(label)) return 'acceso/iniciar-sesion.html';
    if (/ser técnico|ser tecnico|trabaja con nosotros/.test(label)) return 'acceso/registro.html';
    if (/regístrate|registrarse|crear cuenta/.test(label)) return 'acceso/registro.html';
    if (/términos|terminos|privacidad/.test(label)) return 'acceso/terminos-privacidad.html';
    if (/soporte|preguntas frecuentes|ayuda|help center/.test(label)) return 'acceso/preguntas-frecuentes.html';
    if (/cerrar sesión|cerrar sesion/.test(label)) return 'index.html';

    if (current === 'paso-1-identidad.html') {
      if (/siguiente/.test(label)) return 'tecnico/verificacion/paso-2-experiencia.html';
      if (/anterior|volver/.test(label)) return 'index.html';
    }
    if (current === 'paso-2-experiencia.html') {
      if (/siguiente/.test(label)) return 'tecnico/verificacion/paso-3-disponibilidad.html';
      if (/anterior|volver/.test(label)) return 'tecnico/verificacion/paso-1-identidad.html';
    }
    if (current === 'paso-3-disponibilidad.html') {
      if (/pagar|enviar.*revisión|enviar.*revision|siguiente/.test(label)) return 'tecnico/verificacion/estado-aprobacion.html';
      if (/anterior|volver/.test(label)) return 'tecnico/verificacion/paso-2-experiencia.html';
    }
    if (current === 'estado-aprobacion.html') {
      if (/volver al inicio/.test(label)) return 'tecnico/inicio.html';
      if (/reintentar/.test(label)) return 'tecnico/verificacion/paso-1-identidad.html';
    }

    if (current === 'paso-1-descripcion.html') {
      if (/siguiente|ubicación|ubicacion/.test(label)) return 'cliente/solicitar-servicio/paso-2-ubicacion.html';
      if (/volver|anterior/.test(label)) return 'cliente/inicio.html';
    }
    if (current === 'paso-2-ubicacion.html') {
      if (/confirmar.*buscar técnico|confirmar.*buscar tecnico/.test(label)) return 'cliente/solicitar-servicio/paso-3-pago.html';
      if (/cancelar|volver/.test(label)) return 'cliente/solicitar-servicio/paso-1-descripcion.html';
    }
    if (current === 'paso-3-pago.html') {
      if (/finalizar.*pagar/.test(label)) return 'cliente/solicitar-servicio/seguimiento.html';
      if (/volver|anterior/.test(label)) return 'cliente/solicitar-servicio/paso-2-ubicacion.html';
    }
    if (current === 'seguimiento.html') {
      if (/cancelar solicitud/.test(label)) return 'cliente/mis-solicitudes.html';
      if (/whatsapp|mensaje/.test(label)) return 'cliente/mensajes.html';
    }

    if (current === 'nueva-solicitud.html' && /aceptar servicio/.test(label)) return 'tecnico/solicitudes/servicio-en-curso.html';
    if (current === 'nueva-solicitud.html' && /rechazar/.test(label)) return 'tecnico/inicio.html';
    if (current === 'servicio-en-curso.html') {
      if (/contactar|mensaje/.test(label)) return 'tecnico/mensajes.html';
      if (/nueva solicitud/.test(label)) return 'tecnico/solicitudes/nueva-solicitud.html';
    }
    if (current === 'inicio.html' && inTechnician && /aceptar solicitud/.test(label)) return 'tecnico/solicitudes/servicio-en-curso.html';
    if (current === 'inicio.html' && inTechnician && /rechazar/.test(label)) return 'tecnico/solicitudes/nueva-solicitud.html';

    if (inTechnician) {
      if (/inicio|dashboard|home/.test(label)) return 'tecnico/inicio.html';
      if (/mis solicitudes|solicitudes|jobs|my jobs/.test(label)) return 'tecnico/solicitudes/nueva-solicitud.html';
      if (/mensajes/.test(label)) return 'tecnico/mensajes.html';
      if (/billetera|earnings/.test(label)) return 'tecnico/billetera.html';
      if (/configuración|configuracion|perfil|settings|profile/.test(label)) return 'tecnico/configuracion.html';
    }
    if (inClient) {
      if (/solicitar (un |nuevo )?servicio|buscar|explorar/.test(label)) return 'cliente/solicitar-servicio/paso-1-descripcion.html';
      if (/inicio/.test(label)) return 'cliente/inicio.html';
      if (/mis pedidos|mis solicitudes/.test(label)) return 'cliente/mis-solicitudes.html';
      if (/mensajes|mensaje|chat/.test(label)) return 'cliente/mensajes.html';
      if (/perfil|configuración|configuracion/.test(label)) return 'cliente/perfil.html';
      if (/actividad/.test(label)) return 'cliente/mis-solicitudes.html';
      if (/detalles|ver todo/.test(label)) return 'cliente/mis-solicitudes.html';
    }
    return null;
  }

  function connect(element, destinationPath) {
    const url = targetUrl(destinationPath);
    if (element.tagName === 'A') {
      element.setAttribute('href', url);
      return;
    }
    element.type = 'button';
    element.addEventListener('click', () => window.location.assign(url));
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a, button').forEach((element) => {
      // Las pestañas internas controlan contenido de su propia pantalla.
      if (element.classList.contains('tab-btn')) return;
      if (element.tagName === 'A' && element.getAttribute('href') !== '#') return;
      const label = textOf(element);
      // No existe una vista de reseñas; se retira ese acceso para no dejar un enlace muerto.
      if (inTechnician && /reviews/.test(label)) {
        element.remove();
        return;
      }
      const route = destination(label);
      if (route) connect(element, route);
    });
    if (current === 'registro.html') {
      document.querySelector('form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
        const destination = selectedRole === 'technician'
          ? 'tecnico/verificacion/paso-1-identidad.html'
          : 'cliente/inicio.html';
        window.location.assign(targetUrl(destination));
      });
    }
  });
})();
