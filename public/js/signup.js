
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
        
        const response = await axios.post('http://localhost:3000/user/signup/verify', userDetails)
        
        console.log(response.data)
        console.log(response.data.message)
        if (response.data.message=='user found') {
            window.alert('An account with this email already exists. You can try logging in with this email.')
            clearInputFields()
            return;
        }

        //create an account 
        const response1=await axios.post('http://localhost:3000/user/signup', userDetails)

        if(response1.data.message=='Account created successfully')
        {
            window.alert('Account created successfully!! Please login to your account.')
            clearInputFields();
            window.location='/user/login'
        }
        
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