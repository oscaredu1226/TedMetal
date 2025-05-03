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
  const selectorCategoria = document.getElementById('selector-categoria'); // NUEVO

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

      // Ocultar sidebar en móviles
      if (window.innerWidth <= 991) {
        sidebar.classList.add('oculto');
      }

      // Si hay un selector, sincronizarlo
      if (selectorCategoria) {
        selectorCategoria.value = categoria;
      }
    });
  });

  // === Buscador ===
  inputBusqueda?.addEventListener('input', () => {
    const valor = inputBusqueda.value.toLowerCase();

    // Buscar la categoría activa (desde botones o select)
    let categoriaActiva = document.querySelector('.filtro-item.active')?.getAttribute('data-categoria');
    if (!categoriaActiva && selectorCategoria) {
      categoriaActiva = selectorCategoria.value;
    }

    filtrarProductos(categoriaActiva, valor);
  });

  // === Dropdown de categorías (select) ===
  selectorCategoria?.addEventListener('change', () => {
    const categoria = selectorCategoria.value;
    const valorBusqueda = inputBusqueda?.value.toLowerCase() || '';

    // Quitar selección activa de botones si hay
    filtroBotones.forEach(btn => btn.classList.remove('active'));

    filtrarProductos(categoria, valorBusqueda);
  });

  // === TOGGLE SIDEBAR DE FILTROS EN MÓVILES ===
  if (window.innerWidth <= 991 && sidebar) {
    sidebar.classList.add('oculto');
  }

  toggleFiltros?.addEventListener('click', () => {
    sidebar.classList.toggle('oculto');
    toggleFiltros.textContent = sidebar.classList.contains('oculto') ? 'Mostrar Filtros' : 'Ocultar Filtros';
  });

  // === Función para filtrar productos ===
  function filtrarProductos(categoria, textoBusqueda) {
    productos.forEach(producto => {
      const nombre = producto.querySelector('.producto-nombre')?.textContent.toLowerCase();
      const cat = producto.getAttribute('data-categoria').toLowerCase();

      const coincideCategoria = (categoria === 'todos' || cat === categoria.toLowerCase());
      const coincideBusqueda = nombre.includes(textoBusqueda);

      if (coincideCategoria && coincideBusqueda) {
        producto.style.display = 'block';
        setTimeout(() => producto.classList.add('visible'), 10);
      } else {
        producto.classList.remove('visible');
        setTimeout(() => {
          producto.style.display = 'none';
        }, 200);
      }
    });
  }
});
