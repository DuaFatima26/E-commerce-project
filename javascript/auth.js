document.addEventListener('DOMContentLoaded', function () {
    // Initialize Firebase Auth
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // DOM Elements
    const userIcon = document.getElementById("userIcon");
    const authModal = document.getElementById("authModal");
    const closeModal = document.getElementById("closeModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const authMessage = document.getElementById("authMessage");

    // Helper Functions
    function isGmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return re.test(String(email).toLowerCase());
    }

    function showMessage(message, type) {
        if (authMessage) {
            authMessage.textContent = message;
            authMessage.className = "auth-message " + type;
        }
    }

    function clearMessage() {
        if (authMessage) {
            authMessage.textContent = "";
            authMessage.className = "auth-message";
        }
    }

    // Ensure elements exist before adding event listeners
    if (userIcon) {
        console.log("userIcon found");
        userIcon.addEventListener("click", () => {
            if (authModal) {
                authModal.classList.add("active");
            }
        });
    } else {
        console.error('userIcon not found');
    }

    if (closeModal) {
        console.log("closeModal found");
        closeModal.addEventListener("click", () => {
            if (authModal) {
                authModal.classList.remove("active");
            }
            clearMessage();
        });
    } else {
        console.error('closeModal not found');
    }

    if (modalOverlay) {
        console.log("modalOverlay found");
        modalOverlay.addEventListener("click", () => {
            if (authModal) {
                authModal.classList.remove("active");
            }
            clearMessage();
        });
    } else {
        console.error('modalOverlay not found');
    }

    // Tab Switching
    const tabs = document.querySelectorAll(".tab");
    const forms = document.querySelectorAll(".auth-form");

    if (tabs.length > 0 && forms.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const tabName = tab.dataset.tab;

                // Update tabs
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                // Update forms
                forms.forEach(form => form.classList.remove("active"));
                const formToActivate = document.getElementById(`${tabName}Form`);
                if (formToActivate) {
                    formToActivate.classList.add("active");
                }

                clearMessage();
            });
        });
    } else {
        console.error('Tabs or Forms not found');
    }

    // Show Login Form
    const showLogin = document.getElementById("showLogin");
    if (showLogin) {
        console.log("showLogin found");
        showLogin.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector('.tab[data-tab="login"]').click();
        });
    } else {
        console.error('showLogin not found');
    }

    // Forgot Password
    const forgotPassword = document.getElementById("forgotPassword");
    if (forgotPassword) {
        forgotPassword.addEventListener("click", (e) => {
            e.preventDefault();
            const email = prompt("Please enter your Gmail address:");

            if (email) {
                if (!isGmail(email)) {
                    showMessage("Only Gmail addresses are allowed", "error");
                    return;
                }

                auth.sendPasswordResetEmail(email)
                    .then(() => {
                        showMessage("Password reset email sent! Check your inbox.", "success");
                    })
                    .catch(error => {
                        let errorMessage = error.message;
                        if (error.code === "auth/user-not-found") {
                            errorMessage = "No account found with this Gmail";
                        }
                        showMessage(errorMessage, "error");
                    });
            }
        });
    } else {
        console.error('forgotPassword not found');
    }

    // Login Handler
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (!isGmail(email)) {
                showMessage("Only Gmail addresses are allowed", "error");
                return;
            }

            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    authModal.classList.remove("active");
                    alert("✅ Login Successful! Welcome back to Timzee!");
                    clearMessage();
                })
                .catch(error => {
                    let errorMessage = error.message;
                    if (error.code === "auth/user-not-found") {
                        errorMessage = "No account found with this Gmail";
                    } else if (error.code === "auth/wrong-password") {
                        errorMessage = "Incorrect password";
                    }
                    showMessage(errorMessage, "error");
                });
        });
    } else {
        console.error('loginBtn not found');
    }

    // Signup Handler
    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!isGmail(email)) {
                showMessage("Only Gmail addresses are allowed", "error");
                return;
            }

            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    authModal.classList.remove("active");
                    alert("🎉 Account Created Successfully! Welcome to Timzee!");
                    clearMessage();
                })
                .catch(error => {
                    let errorMessage = error.message;
                    if (error.code === "auth/email-already-in-use") {
                        errorMessage = "This Gmail is already registered";
                    } else if (error.code === "auth/weak-password") {
                        errorMessage = "Password should be at least 6 characters";
                    }
                    showMessage(errorMessage, "error");
                });
        });
    } else {
        console.error('signupBtn not found');
    }

    // Google Sign-In
    const googleSignIn = document.getElementById("googleSignIn");
    if (googleSignIn) {
        googleSignIn.addEventListener("click", (e) => {
            e.preventDefault();
            auth.signInWithPopup(provider)
                .then(() => {
                    authModal.classList.remove("active");
                    clearMessage();
                })
                .catch(error => {
                    let errorMessage = error.message;
                    if (error.code === "auth/popup-closed-by-user") {
                        errorMessage = "Sign in process was cancelled";
                    }
                    showMessage(errorMessage, "error");
                });
        });
    } else {
        console.error('googleSignIn not found');
    }
});
