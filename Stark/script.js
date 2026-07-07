// Detectar scroll para cambiar el header
const header = document.querySelector('.hero-header');
const nav = document.querySelector('.main-nav');
let ticking = false;
let isScrollingDown = false;

// Función para manejar el cambio de estado del header
function updateHeaderState() {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 50; // Umbral para activar el modo pequeño
    
    if (currentScrollY > scrollThreshold) {
        // Si NO está en modo pequeño, cambiarlo
        if (!header.classList.contains('small-mode')) {
            header.classList.remove('hero-mode');
            header.classList.add('small-mode');
            document.body.classList.add('has-fixed-header');
            // Ajustar el padding superior del body para evitar que el header tape contenido
            document.body.style.paddingTop = `${header.offsetHeight}px`;
        }
    } else {
        // Si está en modo pequeño y estamos cerca del top, volver a modo hero
        if (header.classList.contains('small-mode')) {
            header.classList.remove('small-mode');
            header.classList.add('hero-mode');
            document.body.classList.remove('has-fixed-header');
            document.body.style.paddingTop = '0';
        }
    }
}

// Escuchar evento scroll optimizado
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHeaderState();
            ticking = false;
        });
        ticking = true;
    }
});

// Menú hamburguesa para responsive
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    const navItems = document.querySelectorAll('.item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

// Ejecutar al inicio para establecer estado correcto
updateHeaderState();

// Ajustar padding cuando el header cambia de tamaño
const resizeObserver = new ResizeObserver(() => {
    if (header.classList.contains('small-mode')) {
        document.body.style.paddingTop = `${header.offsetHeight}px`;
    }
});
resizeObserver.observe(header);

// También ajustar en carga inicial y resize
window.addEventListener('load', () => {
    updateHeaderState();
    if (header.classList.contains('small-mode')) {
        document.body.style.paddingTop = `${header.offsetHeight}px`;
    }
});

window.addEventListener('resize', () => {
    if (header.classList.contains('small-mode')) {
        document.body.style.paddingTop = `${header.offsetHeight}px`;
    }
});