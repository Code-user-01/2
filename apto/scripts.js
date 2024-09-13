document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const sections = document.querySelectorAll('.section');
    const contactForm = document.getElementById('contact-form');
    const header = document.querySelector('header');
    const sliderSection = document.querySelector('.slider');
    const sliderImages = [
        'images/0.webp',
        'images/1.webp',
        'images/2.webp',
        'images/3.webp',
        'images/4.webp',
        'images/5.webp',
        'images/6.webp',
        'images/7.webp',
        'images/8.webp',
        'images/9.webp',
        'images/10.webp',
        'images/11.webp',
        'images/12.webp',
        'images/13.webp'
    ];
    let currentIndex = 0;

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    const validateForm = (formData) => {
        const errors = [];
        if (!formData.get('name').trim()) {
            errors.push({ field: 'name', message: 'El nombre es requerido.' });
        }
        if (!formData.get('email').trim()) {
            errors.push({ field: 'email', message: 'El email es requerido.' });
        } else if (!/\S+@\S+\.\S+/.test(formData.get('email'))) {
            errors.push({ field: 'email', message: 'El email no es válido.' });
        }
        if (!formData.get('message').trim()) {
            errors.push({ field: 'message', message: 'El mensaje es requerido.' });
        }
        return errors;
    };

    const showErrors = (errors) => {
        clearErrors();
        errors.forEach(error => {
            const field = document.querySelector(`[name="${error.field}"]`);
            if (field) {
                const errorElement = document.createElement('span');
                errorElement.classList.add('error-message');
                errorElement.textContent = error.message;
                field.parentElement.appendChild(errorElement);
            }
        });
    };

    const clearErrors = () => {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        clearErrors();

        const formData = new FormData(contactForm);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showErrors(errors);
        } else {
            alert('Formulario enviado correctamente.');
            contactForm.reset();
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        header.classList.toggle('sticky', scrollPosition > 100);

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    };

    const openModal = (element) => {
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");

        modal.style.display = "flex";
        modalImg.src = element.src;
        captionText.innerHTML = element.alt;
    };

    const closeModal = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    };

    const changeBackgroundImage = () => {
        sliderSection.style.backgroundImage = `url(${sliderImages[currentIndex]})`;
        currentIndex = (currentIndex + 1) % sliderImages.length;
    };

    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    contactForm.addEventListener('submit', handleFormSubmit);
    window.addEventListener('scroll', handleScroll);
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById("myModal").addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    });

    // Initialize visibility on load
    handleScroll();

    // Slider initialization
    setInterval(changeBackgroundImage, 7000);
    changeBackgroundImage();

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Close menu on navigation link click
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            closeMenu();
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Open modal on gallery image click
    document.querySelectorAll('.gallery img').forEach(image => {
        image.addEventListener('click', () => openModal(image));
    });
});


/******************************************************/
function sendToWhatsApp(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Construir el mensaje para WhatsApp con un formato más ordenado
    const whatsappMessage = `Hola, soy ${name}.\n\nMi correo es ${email}.\n\nMensaje: ${message}`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Número de WhatsApp y URL
    const phoneNumber = '+573229476426';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirigir al usuario a WhatsApp
    window.open(whatsappURL, '_blank');
}
/*************************************************/
function sendWhatsAppMessage() {
    // Mensaje fijo para el botón flotante de WhatsApp
    const whatsappMessage = "Hola, me interesa tomar el apartamento.";

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Número de WhatsApp y URL
    const phoneNumber = '+573229476426';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirigir al usuario a WhatsApp
    window.open(whatsappURL, '_blank');
}

/**********************************************/ 


// Selecciona los elementos
const agendarVisitaBtn = document.getElementById('agendar-visita-btn');
const calendarioContainer = document.getElementById('calendario-container');
const fechaInput = document.getElementById('fecha-visita');
const horaInput = document.getElementById('hora-visita');
const confirmarFechaBtn = document.getElementById('confirmar-fecha-btn');

// Muestra u oculta el calendario al hacer clic en el botón "Agendar Visita"
agendarVisitaBtn.addEventListener('click', () => {
    calendarioContainer.classList.toggle('oculto');
});

// Deshabilita la entrada manual en los campos de fecha y hora
fechaInput.addEventListener('keydown', (e) => e.preventDefault());
horaInput.addEventListener('keydown', (e) => e.preventDefault());

// Añade un evento de clic para desplegar el calendario cuando se hace clic en cualquier parte de la casilla de fecha
fechaInput.addEventListener('click', () => {
    fechaInput.showPicker();
});

// Añade un evento de clic para desplegar el selector de hora cuando se hace clic en cualquier parte de la casilla de hora
horaInput.addEventListener('click', () => {
    horaInput.showPicker();
});

// Maneja la confirmación de la fecha
confirmarFechaBtn.addEventListener('click', () => {
    const fecha = fechaInput.value;
    const hora = horaInput.value;

    if (fecha && hora) {
        const fechaSeleccionada = new Date(fecha);
        const diaSemana = fechaSeleccionada.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

        // Verifica si el día es entre lunes (1) y sábado (6)
        if (diaSemana >= 1 && diaSemana <= 6) {
            // Construye el mensaje para WhatsApp
            const mensaje = `Hola, me gustaría agendar una visita el día ${fecha} a las ${hora}.`;
            const encodedMessage = encodeURIComponent(mensaje);
            const phoneNumber = '+573229476426'; // Número de WhatsApp
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Oculta el formulario de cita antes de redirigir
            calendarioContainer.classList.add('oculto');
            
            // Redirige a WhatsApp
            window.open(whatsappURL, '_blank');
        } else {
            alert('Por favor, selecciona un día entre lunes y sábado.');
        }
    } else {
        alert('Por favor, selecciona una fecha y hora.');
    }
});


/***********************************************************************/

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el contenedor del video específico en la página
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer.querySelector('video');

    if (video) {
        // Oculta los controles del video por defecto
        video.controls = false;

        // Crear un contenedor para el botón de play/pausa
        const playButtonContainer = document.createElement('div');
        playButtonContainer.classList.add('play-button-container');

        // Crear el botón de play/pausa
        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.textContent = '▶️';

        // Añadir el botón al contenedor
        playButtonContainer.appendChild(playButton);
        videoContainer.appendChild(playButtonContainer);

        // Evento para reproducir o pausar el video al hacer clic en el botón de play/pausa
        playButtonContainer.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButtonContainer.style.display = 'none'; // Oculta el botón al reproducir
            } else {
                video.pause();
                playButtonContainer.style.display = 'flex'; // Muestra el botón al pausar
            }
        });

        // Evento para pausar el video cuando se hace clic en él
        video.addEventListener('click', () => {
            if (!video.paused) {
                video.pause();
                playButtonContainer.style.display = 'flex'; // Muestra el botón de play al pausar
            }
        });

        // Esconder el botón de play mientras el video está en reproducción
        video.addEventListener('play', () => {
            playButtonContainer.style.display = 'none';
        });

        // Mostrar el botón de play cuando el video está pausado
        video.addEventListener('pause', () => {
            playButtonContainer.style.display = 'flex';
        });
    }
});
