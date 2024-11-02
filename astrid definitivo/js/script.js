// Al cargar la página, mostrar solo la sección 'Inicio'
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const leerMasBtn = document.getElementById('leer-mas-btn');  // Botón "Leer más"

    // Ocultar todas las secciones excepto 'inicio' al cargar la página
    sections.forEach(section => {
        if (section.id !== 'inicio') {
            section.classList.add('hidden'); // Usar clases para manejar visibilidad
        }
    });

    // Agregar eventos de clic a los enlaces del menú de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSectionId = this.getAttribute('href').substring(1);
            showSection(targetSectionId);

            // Cerrar el menú hamburguesa en versiones móviles
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Agregar evento de clic al botón "Leer más"
    leerMasBtn.addEventListener('click', function(event) {
        event.preventDefault();
        showSection('sobre-mi');  // Mostrar la sección "Sobre mí" al hacer clic
    });

    // Función para mostrar la sección seleccionada
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden'); // Mostrar la sección seleccionada
                section.style.minHeight = `calc(100vh - ${headerHeight}px)`;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                section.classList.add('hidden'); // Ocultar otras secciones
            }
        });
    }

    // Asegurarse de que siempre se cargue desde el inicio de la página
    window.scrollTo(0, 0);
});

/******************************************************************/

// Control de la galería de certificados
const certificates = document.querySelectorAll('.certificate-unique');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showCertificate(index) {
    certificates.forEach((cert, i) => {
        cert.classList.remove('active', 'previous');
        if (i === index) {
            cert.classList.add('active');
        } else if (i === (index - 1 + certificates.length) % certificates.length) {
            cert.classList.add('previous');
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % certificates.length;
    showCertificate(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
    showCertificate(currentIndex);
});

// Mostrar el primer certificado al cargar la página
showCertificate(currentIndex);

/************************************************************************ */

// Control del menú hamburguesa
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle('open');
    });

    // Detectar cuando el menú se cierra automáticamente (por ejemplo, cuando se hace clic en un enlace)
    navbarCollapse.addEventListener('hidden.bs.collapse', function () {
        navbarToggler.classList.remove('open');
    });
});

/************************************************************************ */

// Mostrar la sección seleccionada de manera más eficiente
function showSection(sectionId) {
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');  // Usar clases en vez de display para manejar visibilidad
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            section.classList.add('hidden');
        }
    });
}
