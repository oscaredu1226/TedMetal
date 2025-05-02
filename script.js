document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('#main-nav a');
  const filtroBotones = document.querySelectorAll('.filtro-item');
  const productos = document.querySelectorAll('.producto-card');
  const inputBusqueda = document.getElementById('busqueda-producto');

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

  // === Filtro por categoría con animación suave ===
  filtroBotones.forEach(boton => {
    boton.addEventListener('click', () => {
      const categoria = boton.getAttribute('data-categoria');

      filtroBotones.forEach(btn => btn.classList.remove('active'));
      boton.classList.add('active');

      productos.forEach(producto => {
        const cat = producto.getAttribute('data-categoria');
        if (categoria === 'todos' || cat === categoria) {
          producto.style.display = 'block';
          setTimeout(() => {
            producto.classList.add('visible');
          }, 10);
        } else {
          producto.classList.remove('visible');
          setTimeout(() => {
            producto.style.display = 'none';
          }, 300); // espera que termine animación antes de ocultar
        }
      });
    });
  });

  inputBusqueda?.addEventListener('input', () => {
    const valor = inputBusqueda.value.toLowerCase();
    const categoriaActiva = document.querySelector('.filtro-item.active')?.getAttribute('data-categoria');
  
    productos.forEach(producto => {
      const nombre = producto.querySelector('.producto-nombre')?.textContent.toLowerCase();
      const categoria = producto.getAttribute('data-categoria');
  
      const coincideNombre = nombre.includes(valor);
      const coincideCategoria = (categoriaActiva === 'todos' || categoria === categoriaActiva);
  
      if (coincideNombre && coincideCategoria) {
        producto.style.display = 'block';
        setTimeout(() => producto.classList.add('visible'), 10);
      } else {
        producto.classList.remove('visible');
        setTimeout(() => {
          producto.style.display = 'none';
        }, 200);
      }
    });
  });
  
});
