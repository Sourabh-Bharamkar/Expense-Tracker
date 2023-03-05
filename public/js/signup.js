
const signupForm = document.getElementById('signup-form')

signupForm.addEventListener('submit', signup)


async function signup(e) {

    try {

        e.preventDefault()
        // get the form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const userDetails = {
            name: name,
            email: email,
            password: password
        }

        //verify password length 
        console.log(typeof password)

        if (password.length < 8 || password.length>20) {
            document.getElementById('password-error').textContent = "* Passwords must be between 8 and 20 characters long."

            setTimeout(() => {
                document.getElementById('password-error').textContent = ""
            }, 5000)

            return;
        }

    
        // verify if there any user exists with same email id
        console.log('hi')
        
        const response = await axios.post('http://localhost:3000/user/verify', userDetails)
        const existUser=response.data;

        console.log(existUser)

        if (existUser) {
            window.alert('An account with this email already exists.Please use another email')
            return;
        }

        //create an account 
        axios.post('http://localhost:3000/user/signup', userDetails)

        clearInputFields();

    }
    catch {
        (error) => {
            console.log(error)
        }
    }

}

//function to cleat input fields
function clearInputFields() {
    document.getElementById('name').value = ""
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

}