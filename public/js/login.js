
const loginForm = document.getElementById('login-form')

//adding event listener to login form on submit
loginForm.addEventListener('submit', login)


async function login(e) {

    try {

        e.preventDefault();
        // get the form input values
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

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

        window.alert('Login successful!!')
        localStorage.setItem('token',response.data.token)
        clearInputFields();
        window.location = '/add-expense'

    }
    catch (error) {

        if (error.response.data.message == 'password is incorrect') {
            document.getElementById('password-error').textContent = "* Password is incorrect"

            setTimeout(() => {
                document.getElementById('password-error').textContent = ""
            }, 5000)
            document.getElementById('login-password').value = "";
            return;
        }

    }

}

//function to cleat input fields
function clearInputFields() {

    document.getElementById('login-email').value = ""
    document.getElementById('login-password').value = ""

}


//after clicking on signup here link,open signup modal
document.getElementById('signup-here-link').addEventListener('click',(e)=>{
    e.preventDefault()
    //close the login modal and open signup modal
    const loginModal = document.getElementById('login-modal')
    const signupModal=document.getElementById('signup-modal')
    loginModal.style.display='none'
    signupModal.style.display='block';
})