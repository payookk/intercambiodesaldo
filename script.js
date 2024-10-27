document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");
    const workerPanel = document.getElementById("worker-panel");
    const adminPanel = document.getElementById("admin-panel");
    const notification = document.getElementById("notification");
    const loginModal = document.getElementById("login-modal");
    const closeModal = document.getElementById("close-modal");

    // Verificar si el usuario ya ha creado su cuenta
    if (localStorage.getItem("username")) {
        showWorkerPanel();
    } else {
        formContainer.style.display = "flex";
    }

    // Crear usuario y contraseña
    document.getElementById("user-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            showNotification("Las contraseñas no coinciden.", true);
            return;
        }

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        showWorkerPanel();
        showNotification("Usuario creado exitosamente.");
    });

    // Mostrar el panel de trabajador
    function showWorkerPanel() {
        formContainer.style.display = "none";
        workerPanel.style.display = "flex";
    }

    // Administrar (panel de administrador)
    document.getElementById("admin-btn").addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    // Ingreso al panel de administrador
    document.getElementById("admin-login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const adminUsername = document.getElementById("admin-username").value;
        const adminPassword = document.getElementById("admin-password").value;

        if (adminUsername === localStorage.getItem("username") && adminPassword === localStorage.getItem("password")) {
            showNotification("Bienvenido al panel de administrador.");
            loginModal.style.display = "none";
            adminPanel.style.display = "flex";
            workerPanel.style.display = "none"; // Esconder el panel de trabajador
        } else {
            showNotification("Usuario o contraseña incorrectos.", true);
        }
    });

    // Cerrar sesión (recargar la página)
    document.getElementById("logout-btn").addEventListener("click", function () {
        location.reload(); // Recargar la página actual
    });

    // Cerrar modal
    closeModal.addEventListener("click", function () {
        loginModal.style.display = "none";
    });

    // Función para mostrar notificaciones
    function showNotification(message, isError = false) {
        notification.textContent = message;
        notification.className = `notification ${isError ? 'error' : ''}`;
        notification.style.display = 'block';
        notification.style.opacity = '1';

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener("click", function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const changeCredentialsModal = document.getElementById("change-credentials-modal");
    const closeChangeModal = document.querySelector(".close-change-modal");

    // Mostrar el modal para cambiar credenciales
    document.getElementById("change-credentials-btn").addEventListener("click", function () {
        changeCredentialsModal.style.display = "block";
    });

    // Cerrar el modal
    closeChangeModal.addEventListener("click", function () {
        changeCredentialsModal.style.display = "none";
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener("click", function (event) {
        if (event.target == changeCredentialsModal) {
            changeCredentialsModal.style.display = "none";
        }
    });

    // Cambiar usuario y contraseña
    document.getElementById("change-credentials-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmNewPassword = document.getElementById("confirm-new-password").value;

        // Validar si las contraseñas coinciden
        if (newPassword !== confirmNewPassword) {
            notification.innerHTML = "<p style='color: red;'>Las contraseñas no coinciden.</p>";
            return;
        }

        // Actualizar localStorage con el nuevo usuario y contraseña
        localStorage.setItem("username", newUsername);
        localStorage.setItem("password", newPassword);

        // Mostrar notificación de éxito
        notification.innerHTML = "<p style='color: green;'>Credenciales actualizadas exitosamente.</p>";

        // Opcional: Puedes cerrar el modal después de unos segundos si deseas
        setTimeout(function () {
            changeCredentialsModal.style.display = "none";
        }, 2000);
    });
});

// Esperar 3 segundos antes de ocultar la pantalla de carga
window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("loader").style.display = "none"; // Ocultar el loader
    }, 3000); // 3 segundos de espera
});