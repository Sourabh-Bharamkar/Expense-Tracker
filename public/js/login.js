
const loginForm = document.getElementById('login-form')

//adding event listener to login form on submit
loginForm.addEventListener('submit', login)


async function login(e) {

    try {

        e.preventDefault()
        // get the form input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const userDetails = {
            email: email,
            password: password
        }

        // verify the email id and password
       
        const response = await axios.post('http://localhost:3000/user/verify', userDetails)
        const existUser=response.data;

        if (!existUser) {
            window.alert(`User not found!`)
            clearInputFields();

            return;
        }

        if(response.data.password!=password){
            document.getElementById('password-error').textContent = "* Your email and password do not match. Please try again."

            setTimeout(() => {
                document.getElementById('password-error').textContent = ""
            }, 5000)
        }

        //create an account 
        axios.post('http://localhost:3000/user/login', userDetails)

        clearInputFields();

        window.alert('User login successful')
        
    }
    catch {
        (error) => {
            console.log(error)
        }
    }

}

//function to cleat input fields
function clearInputFields() {
    
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

}