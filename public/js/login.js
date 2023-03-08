
const loginForm = document.getElementById('login-form')

//adding event listener to login form on submit
loginForm.addEventListener('submit', login)


async function login(e) {

    try {

        e.preventDefault();
        // get the form input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const userDetails = {
            email: email,
            password: password
        }

        // verify the email id and password

        const response = await axios.post('http://localhost:3000/user/login/verify', userDetails)

        console.log(response.data)
        console.log(response.data.message)

        if (response.data.message == 'user not found') {
            window.alert(`User not found!`)
            clearInputFields();

            return;
        }

        if (response.data.message == 'password is incorrect') {
            document.getElementById('password-error').textContent = "* Password is incorrect"

            setTimeout(() => {
                document.getElementById('password-error').textContent = ""
            }, 5000)

            return;
        }

        window.alert('Login successful!!')
        clearInputFields();
        window.location = '/user/expense'

    }
    catch (error) {

        if (error.response.data.message == 'password is incorrect') {
            document.getElementById('password-error').textContent = "* Password is incorrect"

            setTimeout(() => {
                document.getElementById('password-error').textContent = ""
            }, 5000)
            document.getElementById('password').value = "";
            return;
        }

    }

}

//function to cleat input fields
function clearInputFields() {

    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

}