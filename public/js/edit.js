

window.addEventListener('DOMContentLoaded', fillInputFields)

async function fillInputFields() {
    try {
        console.log(window.location.href)
        const url = new URL(`${window.location.href}`)
        const searchParams = url.searchParams
        const id = searchParams.get('id')
        
        console.log(id)
        const response = await axios.get(`http://localhost:3000/expense-details/${id}`)

        

        document.getElementById('expense-amount').value = response.data.amount;
        document.getElementById('expense-description').value = response.data.description
        document.getElementById('expense-category').value = response.data.category




    } catch {
        (error) => {
            console.log(error)
        }
    }


}


const expenseButton = document.getElementById('edit-expense-button')

//adding event listener to add expense button
expenseButton.addEventListener('click', updateDetails)

async function updateDetails() {
    try {
        
        const url = new URL(`${window.location.href}`)
        const searchParams = url.searchParams
        const id = searchParams.get('id')

        const expenseDetails = {
            amount: document.getElementById('expense-amount').value,
            description: document.getElementById('expense-description').value,
            category: document.getElementById('expense-category').value
        }


        const response1 = await axios.post(`http://localhost:3000/edit-expense/${id}`, expenseDetails)

        window.location = '/';

    } catch {
        (error) => {
            console.log(error)
        }
    }

}