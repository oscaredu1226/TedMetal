document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('#main-nav a');
  const filtroBotones = document.querySelectorAll('.filtro-item');
  const productos = document.querySelectorAll('.producto-card');
  const inputBusqueda = document.getElementById('busqueda-producto');
  const sidebar = document.querySelector('.sidebar-filtros');
  const toggleFiltros = document.getElementById('abrir-filtros');
  const selectorCategoria = document.getElementById('selector-categoria');

  // === NAVBAR TOGGLE ===
  toggle?.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay?.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  // === Mostrar todos los productos al cargar ===
  filtroBotones.forEach(btn => {
    if (btn.getAttribute('data-categoria') === 'todos') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  productos.forEach(producto => {
    producto.style.display = 'block';
    setTimeout(() => {
      producto.classList.add('visible');
    }, 10);
  });

  // === Filtro por categoría con botones ===
  filtroBotones.forEach(boton => {
    boton.addEventListener('click', () => {
      const categoria = boton.getAttribute('data-categoria');
      filtroBotones.forEach(btn => btn.classList.remove('active'));
      boton.classList.add('active');
      filtrarProductos(categoria, inputBusqueda?.value.toLowerCase() || '');
      if (window.innerWidth <= 991) sidebar.classList.add('oculto');
      if (selectorCategoria) selectorCategoria.value = categoria;
    });
  });

  // === Buscador ===
  inputBusqueda?.addEventListener('input', () => {
    const valor = inputBusqueda.value.toLowerCase();
    let categoriaActiva = document.querySelector('.filtro-item.active')?.getAttribute('data-categoria');
    if (!categoriaActiva && selectorCategoria) categoriaActiva = selectorCategoria.value;
    filtrarProductos(categoriaActiva, valor);
  });

  // === Dropdown de categorías (select) ===
  selectorCategoria?.addEventListener('change', () => {
    const categoria = selectorCategoria.value;
    const valorBusqueda = inputBusqueda?.value.toLowerCase() || '';
    filtroBotones.forEach(btn => btn.classList.remove('active'));
    filtrarProductos(categoria, valorBusqueda);
  });

  // === TOGGLE SIDEBAR EN MÓVILES ===
  if (window.innerWidth <= 991 && sidebar) {
    sidebar.classList.add('oculto');
  }

  toggleFiltros?.addEventListener('click', () => {
    sidebar.classList.toggle('oculto');
    toggleFiltros.textContent = sidebar.classList.contains('oculto') ? 'Mostrar Filtros' : 'Ocultar Filtros';
  });

  // === Aplicar categoría desde la URL ===
  const params = new URLSearchParams(window.location.search);
  const categoriaURL = params.get('categoria');
  if (categoriaURL) {
    filtroBotones.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-categoria') === categoriaURL);
    });
    if (selectorCategoria) selectorCategoria.value = categoriaURL;
    filtrarProductos(categoriaURL, '');
  }

  // === Función para filtrar productos ===
  function filtrarProductos(categoria, textoBusqueda) {
    productos.forEach(producto => {
      const nombre = producto.querySelector('.producto-nombre')?.textContent.toLowerCase();
      const cat = producto.getAttribute('data-categoria')?.toLowerCase();
      const coincideCategoria = (categoria === 'todos' || cat === categoria.toLowerCase());
      const coincideBusqueda = nombre.includes(textoBusqueda);
      if (coincideCategoria && coincideBusqueda) {
        producto.style.display = 'block';
        setTimeout(() => producto.classList.add('visible'), 10);
      } else {
        producto.classList.remove('visible');
        setTimeout(() => producto.style.display = 'none', 200);
      }
    });
  }

  // === Generar botón de WhatsApp dinámicamente ===
  const numeroWhatsApp = '51987509361';
  productos.forEach(producto => {
    const nombre = producto.querySelector('.producto-nombre')?.textContent.trim();
    if (!nombre || producto.querySelector('.boton-comprar')) return;
    const mensaje = encodeURIComponent(`Hola TEDMETAL, quisiera información sobre ${nombre}`);
    const enlace = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    const boton = document.createElement('a');
    boton.href = enlace;
    boton.target = '_blank';
    boton.className = 'boton-comprar';
    boton.textContent = 'Comprar';
    producto.appendChild(boton);
  });
});
