/* Navegación visual compartida para las vistas autenticadas de HOMELY. */
(() => {
  const url = new URL(window.location.href);
  const pathParts = decodeURIComponent(url.pathname).split('/').filter(Boolean);
  const isGitHubPages = url.hostname.endsWith('.github.io');
  const localRootIndex = pathParts.findIndex((part) => part.toLowerCase().includes('homely'));
  const rootPath = isGitHubPages
    ? (pathParts[0] ? `/${pathParts[0]}/` : '/')
    : (localRootIndex >= 0 ? `/${pathParts.slice(0, localRootIndex + 1).join('/')}/` : '/');
  const appRoot = new URL(rootPath, url);
  const isTechnician = url.pathname.includes('/tecnico/');
  const isClient = url.pathname.includes('/cliente/');

  if (!isTechnician && !isClient) return;

  const route = (path) => new URL(path, appRoot).href;
  const current = url.pathname;
  const role = isTechnician ? 'Técnico Verificado' : 'Cliente Verificado';
  const avatar = isTechnician
    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhZ-mNO1HFZhdIgTIIAyS_xUXgbh_BMM-GON7VkKP6JAnJRwnYDkvSItU2DuWYNKRKEVpN_xxmVYVmVLIrLSoXAAFM8DRLyhyq9AqFcAxXeflLhJ4gTioCv_IIICg-19MuUyWG2_I77EGlZChq620TQVT-ZRWL8dzfcs3GfI8HNVXWimHgWcFWqdB-ktinijSjDvbcjzxCGERN0o5XVxbLe-UcPc_Wh1tR3_QPd0YP5IJtH2Np3O4J4w'
    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa_5QoeDLacCueNQUcR0nbRUBN7Y2ClGSLdIISQX-Te5tnTTFKHJU_uHssIdsNH-jJ56n7aszlOYuRa6_bbuu6KERRg9eM3hB3y3s5UnvgnjM4ravjXLu9-Buc-1FGLOrxsWtHM8syTYrucnj7ER19OQTZUc1_RtDwuePkdwKYZlYULnj6Y7RDub208DsWksXKiGgV0vK7y6t1FE5_6wl0vTq5Wj5aUE6oDGUrTSumR548jHjViMrx1Q';
  const items = isTechnician
    ? [
        ['Inicio', 'home', 'tecnico/inicio.html', current.endsWith('/tecnico/inicio.html')],
        ['Mis Solicitudes', 'assignment', 'tecnico/solicitudes/nueva-solicitud.html', current.includes('/tecnico/solicitudes/')],
        ['Mensajes', 'chat', 'tecnico/mensajes.html', current.endsWith('/tecnico/mensajes.html')],
        ['Billetera', 'payments', 'tecnico/billetera.html', current.endsWith('/tecnico/billetera.html')],
        ['Configuración', 'settings', 'tecnico/configuracion.html', current.endsWith('/tecnico/configuracion.html')],
      ]
    : [
        ['Inicio', 'home', 'cliente/inicio.html', current.endsWith('/cliente/inicio.html')],
        ['Mis Solicitudes', 'assignment', 'cliente/mis-solicitudes.html', current.includes('/cliente/solicitar-servicio/') || current.endsWith('/cliente/mis-solicitudes.html')],
        ['Mensajes', 'chat', 'cliente/mensajes.html', current.endsWith('/cliente/mensajes.html')],
        ['Configuración', 'settings', 'cliente/perfil.html', current.endsWith('/cliente/perfil.html')],
      ];

  const itemMarkup = ([label, icon, path, active]) => `
    <a class="hs-link${active ? ' is-active' : ''}" href="${route(path)}"${active ? ' aria-current="page"' : ''}>
      <span class="material-symbols-outlined"${active ? " style=\"font-variation-settings: 'FILL' 1;\"" : ''}>${icon}</span>
      <span>${label}</span>
    </a>`;

  const desktopMarkup = () => `
    <div class="hs-shell">
      <div class="hs-brand"><span class="material-symbols-outlined">${isTechnician ? 'handyman' : 'home'}</span><span>Homely</span></div>
      <div class="hs-profile"><img src="${avatar}" alt="Avatar de usuario"><div><strong>Hola, Usuario</strong><small>${role}</small></div></div>
      <div class="hs-links">${items.map(itemMarkup).join('')}</div>
      <div class="hs-footer">${isClient ? `<a class="hs-request" href="${route('cliente/solicitar-servicio/paso-1-descripcion.html')}"><span class="material-symbols-outlined">add</span>Solicitar servicio</a>` : ''}
        <a class="hs-link" href="${route('acceso/preguntas-frecuentes.html')}"><span class="material-symbols-outlined">help</span><span>Ayuda</span></a>
        <a class="hs-link" href="${route('index.html')}"><span class="material-symbols-outlined">logout</span><span>Cerrar sesión</span></a>
      </div>
    </div>`;
  const mobileMarkup = () => `
    <div class="hs-mobile-links">
      ${items.slice(0, 4).map(([label, icon, path, active]) => `
        <a class="hs-mobile-link${active ? ' is-active' : ''}" href="${route(path)}"${active ? ' aria-current="page"' : ''}>
          <span class="material-symbols-outlined"${active ? " style=\"font-variation-settings: 'FILL' 1;\"" : ''}>${icon}</span>
          <span>${label === 'Mis Solicitudes' ? 'Solicitudes' : label === 'Configuración' ? 'Perfil' : label}</span>
        </a>`).join('')}
      <a class="hs-mobile-link hs-mobile-logout" href="${route('index.html')}">
        <span class="material-symbols-outlined">logout</span>
        <span>Salir</span>
      </a>
    </div>`;

  const style = document.createElement('style');
  style.textContent = `
    .homely-standard-sidebar{padding:0!important;background:#fff!important;border-right:1px solid #dcc1b5!important;box-shadow:0 2px 8px rgba(74,63,53,.08)!important;}
    .homely-standard-sidebar .hs-shell{height:100%;min-height:100vh;width:100%;display:flex;flex-direction:column;padding:24px 16px;box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif;}
    .hs-brand{display:flex;align-items:center;gap:8px;color:#9b4509;font-size:24px;font-weight:800;margin:0 8px 28px}.hs-brand .material-symbols-outlined{font-size:28px}
    .hs-profile{display:flex;align-items:center;gap:12px;background:#fdebdc;border-radius:12px;padding:10px;margin:0 0 20px}.hs-profile img{width:44px;height:44px;object-fit:cover;border-radius:50%}.hs-profile strong,.hs-profile small{display:block}.hs-profile strong{font-size:14px;color:#231a11}.hs-profile small{font-size:12px;color:#745a34;margin-top:2px}
    .hs-links{display:grid;gap:6px}.hs-link{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 14px;border-radius:12px;color:#554339;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s,transform .15s}.hs-link:hover{background:#f1dfd1}.hs-link.is-active{background:#e07a3e;color:#501f00;transform:translateX(4px)}.hs-link .material-symbols-outlined{font-size:21px}
    .hs-footer{margin-top:auto;padding-top:16px;border-top:1px solid #dcc1b5;display:grid;gap:6px}.hs-request{min-height:48px;display:flex;align-items:center;justify-content:center;gap:8px;background:#e07a3e;color:#501f00;text-decoration:none;border-radius:12px;font-size:14px;font-weight:700;margin-bottom:8px}.hs-request:hover{background:#ffb690}
    .homely-standard-mobile{height:72px!important;padding:4px 8px max(4px, env(safe-area-inset-bottom))!important;background:#fff!important;border:0!important;border-top:1px solid #dcc1b5!important;border-radius:0!important;box-shadow:0 -4px 20px rgba(74,63,53,.1)!important}.hs-mobile-links{height:100%;display:flex;align-items:center;justify-content:space-around;gap:2px}.hs-mobile-link{min-width:0;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px 1px;border-radius:12px;color:#554339;text-decoration:none;font-size:10px;font-weight:600;line-height:1.1;text-align:center}.hs-mobile-link .material-symbols-outlined{font-size:22px}.hs-mobile-link.is-active{background:#e07a3e;color:#501f00;font-weight:700}.hs-mobile-logout{color:#ba1a1a}.hs-mobile-logout:hover{background:#ffdad6;color:#93000a}
    @media (max-width:767px){body.homely-has-mobile-nav{padding-bottom:76px!important}.hs-mobile-link span:last-child{max-width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}
  `;
  document.head.appendChild(style);

  const standardizeNavigation = () => {
    let hasDesktopNavigation = false;
    let hasMobileNavigation = false;
    document.querySelectorAll('nav').forEach((nav) => {
      const classes = typeof nav.className === 'string' ? nav.className : '';
      if (classes.includes('md:flex') && classes.includes('w-64')) {
        hasDesktopNavigation = true;
        nav.classList.add('homely-standard-sidebar');
        nav.setAttribute('aria-label', 'Navegación principal');
        nav.innerHTML = desktopMarkup();
      }
      if (classes.includes('md:hidden') && classes.includes('bottom-0')) {
        hasMobileNavigation = true;
        nav.classList.add('homely-standard-mobile');
        nav.setAttribute('aria-label', 'Navegación móvil');
        nav.innerHTML = mobileMarkup();
        document.body.classList.add('homely-has-mobile-nav');
      }
    });
    if (hasDesktopNavigation && !hasMobileNavigation) {
      const mobileNav = document.createElement('nav');
      mobileNav.className = 'fixed bottom-0 left-0 w-full z-50 md:hidden homely-standard-mobile';
      mobileNav.setAttribute('aria-label', 'Navegación móvil');
      mobileNav.innerHTML = mobileMarkup();
      document.body.appendChild(mobileNav);
      document.body.classList.add('homely-has-mobile-nav');
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', standardizeNavigation);
  } else {
    standardizeNavigation();
  }
})();
