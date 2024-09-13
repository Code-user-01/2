// Función para establecer una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Tiempo de expiración de la cookie
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Función para sugerir el enlace almacenado
function suggestLink(input) {
    const storedURL = getCookie('recommendedURL');
    if (storedURL && input.value.startsWith('d')) { // Verifica si la entrada empieza con 'd'
        const suggestionDiv = document.getElementById('suggestion');
        suggestionDiv.innerHTML = `Recomendación: <a href="${storedURL}">${storedURL}</a>`;
        suggestionDiv.style.display = 'block'; // Muestra la sugerencia
    } else {
        document.getElementById('suggestion').style.display = 'none'; // Oculta la sugerencia si no es aplicable
    }
}

// Almacena el enlace en una cookie (para un mes)
setCookie('recommendedURL', 'https://devlogic-carlos-patino.netlify.app', 30);

// Event listener para capturar la entrada del usuario
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('search-input'); // Asumiendo que este es el ID del campo de búsqueda
    inputField.addEventListener('input', () => suggestLink(inputField)); // Detecta entrada del usuario
});
