let signUpBtn = document.getElementById("signup")
let signupForm = document.getElementById("form-signup")
let signUpUsername = document.getElementById("signup-username")
let signUpPassword = document.getElementById("signup-password")
let signUpEmail = document.getElementById("signup-email")
let loginForm = document.getElementById("form-login")
let logInUsername = document.getElementById("username")
let logInPassword = document.getElementById("password")
let logInBtn = document.getElementById("login")
let backBtn = document.getElementById(("signup-backbtn"))
let sendBtn = document.getElementById(("signup-sendbtn"))
let adminForm = document.getElementById(("form-admin"))
let userInfo = document.getElementById("user")
let logOutBtn = document.getElementById("admin-logout")
let delAccountBtn = document.getElementById("admin-delete")


signUpBtn.addEventListener("click", function (e) {
    e.preventDefault()
    showSignupForm()
})

backBtn.addEventListener("click", function (e) {
    e.preventDefault()
    showLoginForm()
})


logInBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (loginValidation(logInUsername, logInPassword)) {
        let actualUser = getStorage()
        showAdminForm(logInUsername, actualUser.mail)
        logInUsername.value = ""
        logInPassword.value = ""
    } else {
        alert("Hibás felhasználónév vagy jelszó!")
        logInUsername.value = ""
        logInPassword.value = ""
    }
})

logOutBtn.addEventListener("click", function (e) {
    e.preventDefault()
    showLoginForm()
})

delAccountBtn.addEventListener("click", function (e) {
    e.preventDefault()
    localStorage.clear()
    showLoginForm()
})


signupForm.addEventListener("keyup", function (e) {
    e.preventDefault()
    if (isInputValid(signUpUsername)) {
        console.log("usernamevalid")
    }
    if (isEmailAddress(signUpEmail)) {
        console.log(("emailvalid"))
    }
    if (isInputValid(signUpPassword)) {
        console.log(("passwordvalid"))
    }
    if (isValidForm(signUpUsername, signUpEmail, signUpPassword)) {
        sendBtn.disabled = false
    }
})


sendBtn.addEventListener("click", function (e) {
    e.preventDefault()
    setStorage(signUpUsername, signUpEmail, signUpPassword)
    setTimeout(function () {
        alert("Most már be tudsz jelentkezni!")
        showLoginForm()
    }, 3000);
})


function loginValidation(username, password) {
    let data = getStorage('userdata')
    const coded = window.atob(data.pass)
    if (username.value === data.name && password.value === coded) {
        return true
    } else {
        return false
    }
}


function showAdminForm(username, email) {
    loginForm.style.display = "none"
    signupForm.style.display = "none"
    adminForm.style.display = "block"
    userInfo.textContent = "username :" + username.value + " , email: " + email


}

function showSignupForm() {
    loginForm.style.display = "none"
    signupForm.style.display = "block"
    adminForm.style.display = "none"
}


function showLoginForm() {
    loginForm.style.display = "block"
    signupForm.style.display = "none"
    adminForm.style.display = "none"
}


function setStorage(username, email, password) {
    const encoded = window.btoa(password.value)
    let userData = {
        name: username.value,
        mail: email.value,
        pass: encoded
    }
    localStorage.setItem('userdata', JSON.stringify(userData))
    username.value = ""
    email.value = ""
    password.value = ""
}


function getStorage() {
    return JSON.parse(localStorage.getItem('userdata'))
}


function isEmailAddress(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value)) {
        return true
    }
    return false
}

function isInputValid(input) {
    if (input.value.length >= 12) {
        return true
    } else {
        return false
    }
}

function isValidForm(username, email, password) {
    if (isInputValid(username) && isEmailAddress(email) && isInputValid(password)) {
        return true
    } else {
        return false
    }
}