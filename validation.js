const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

name.addEventListener('input', () => {
    nameError.textContent = '';
});
email.addEventListener('input', () => {
    emailError.textContent = '';
});
password.addEventListener('input', () => {
    passwordError.textContent = '';
});
if (confirmpassword) {
    confirmpassword.addEventListener('input', () => {
        document.getElementById('confirmpasswordError').textContent = '';
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetErrorStyles();
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    if (document.getElementById('confirmpasswordError')) {
        document.getElementById('confirmpasswordError').textContent = '';
    }

    let hasError = false;
    let errors = [];
    const isSignup = confirmpassword !== null;
    if (isSignup) {
        errors = signupformerrors(
            name.value.trim(),
            email.value.trim(),
            password.value.trim(),
            confirmpassword.value.trim()
        );
        // Show confirm password error if passwords do not match
        if (password.value.trim() !== confirmpassword.value.trim()) {
            document.getElementById('confirmpasswordError').textContent = 'Passwords do not match.';
            hasError = true;
        }
    } else {
        errors = loginFormErrors(
            email.value.trim(),
            password.value.trim()
        );
    }

    if (name.value.trim() === "") {
        nameError.textContent = "Name is required.";
        hasError = true;
    }

    if (email.value.trim() === "") {
        emailError.textContent = "Email is required.";
        hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        emailError.textContent = "Enter a valid email.";
        hasError = true;
    }

    if (password.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        hasError = true;
    }

    if (!hasError) {
        // Store name in localStorage if signing up
        if (isSignup) {
            localStorage.setItem('username', name.value.trim());
        } else {
            // If logging in, try to retrieve the name from localStorage using email (future improvement)
            // For now, do nothing
        }
        window.location.href = 'loggedin.html'
    }
});

function signupformerrors(name, email, password, confirmpassword) {
    let errors = [];
    resetErrorStyles();
    if (name === "" || name == null) {
        errors.push("Name is required");
        document.getElementById("name").parentElement.classList.add("Incorrect");
    }
    if (email === "" || email == null) {
        errors.push("Email is required");
        document.getElementById("email").parentElement.classList.add("Incorrect");
    }
    if (password === "" || password == null) {
        errors.push("Password is required");
        document.getElementById("password").parentElement.classList.add("Incorrect");
    }
    if (password !== confirmpassword) {
        errors.push("Passwords does not match");
        if (confirmpassword !== undefined && document.getElementById('confirmpassword')) {

            document.getElementById("confirmpassword").parentElement.classList.add("Incorrect");
        }
    }
    return errors;
}
function loginFormErrors(email, password) {
    let errors = [];

    resetErrorStyles();

    if (email === '') {
        errors.push('Email is required');
        document.getElementById('email').parentElement.classList.add('Incorrect');
    }

    if (password === '') {
        errors.push('Password is required');
        document.getElementById('password').parentElement.classList.add('Incorrect');
    }

    return errors;
}
function resetErrorStyles() {

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.parentElement.classList.contains('Incorrect')) {
            input.parentElement.classList.remove('Incorrect');
        }
    });
}
