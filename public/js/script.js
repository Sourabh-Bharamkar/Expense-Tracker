
let expenseBtn = document.getElementById('add-expense')

//get all input elements 
let expenseAmount = document.getElementById('expense-amount')
let expenseDescription = document.getElementById('expense-description')
let expenseCategory = document.getElementById('expense-category')

let expenseList = document.getElementById('expense-list')

// add addEventListener to addExpense Button,edit and delete button 

expenseBtn.addEventListener('click', addExpense)


//function to add expense details 
//saving the expense details to database and showing it on screen too 

async function addExpense() {

    try {
        //get all input elements 
       
        let expenseAmount = document.getElementById('expense-amount')
        let expenseDescription = document.getElementById('expense-description')
        let expenseCategory = document.getElementById('expense-category')

        //crate object of expense details entered by the user
        let expenseDetails = {
            
            amount: `${expenseAmount.value}`,
            description: `${expenseDescription.value}`,
            category: `${expenseCategory.value}`
        }

        console.log('inside add expense function')

        const response = await axios.post(`http://localhost:3000/add-expense-details`, expenseDetails)

        let expenseDetailsHTML = 
        `<li id=${response.data.id}>
        ${response.data.amount}-${response.data.category}-${response.data.description} 
        <button class='btn btn-outline-success btn-sm mx-1 edit' >Edit</button>
        <button class='btn btn-outline-danger btn-sm mx-1 delete'>Delete</button>    
        </li>`


        document.getElementById('expense-list').insertAdjacentHTML('beforeend', expenseDetailsHTML)


        // make all the input values to default 

        document.getElementById('expense-amount').value = ""
        document.getElementById('expense-description').value = ""
        document.getElementById('expense-category').value = ""

    } catch {
        (error) => {
            console.log(error)
        }
    }


}


//get all expense details from server and show them on user screen 
//adding event handler to  DOMContentLoaded

window.addEventListener('DOMContentLoaded', getAllExpensesFromServer)

async function getAllExpensesFromServer() {

    try {
        console.log('entered into getAllExpensesFromServer ')
        const response = await axios.get('http://localhost:3000/expenses')

        let expenseDetails = response.data;

        expenseDetails.forEach((element) => {

            let expenseDetailsHTML = `<li id=${element.id}>
            ${element.amount}-${element.category}-${element.description} 
            <button class='btn btn-outline-success btn-sm mx-1 edit' >Edit</button>
            <button class='btn btn-outline-danger btn-sm mx-1 delete'>Delete</button> 
            </li>`

            document.getElementById('expense-list').insertAdjacentHTML('beforeend', expenseDetailsHTML)

        })
    } catch {
        (error) => {
            console.log(error)
        }
    }

}

//adding delete functionality
expenseList.addEventListener('click', deleteExpense)

async function deleteExpense(e) {

    try {
        if (e.target.classList.contains('delete')) {
            const response = window.confirm('Do you want delete expense?')
            if (response) {


                let id = e.target.parentNode.id;
                const response = await axios.get(`http://localhost:3000/delete-expense/${id}`)

                // delete target element from screen also
                e.target.parentNode.remove();


            }
        }


    } catch {
        (error) => {
            console.log(error)
        }
    }

}

//add edit functionality
expenseList.addEventListener('click', editExpense)

async function editExpense(e) {
    try {

        if (e.target.classList.contains('edit')) {

            console.log('inside edit expense function')
            const id = e.target.parentNode.id

            const response = await axios.get(`http://localhost:3000/expense-details/${id}`)
            console.log(response.data)
            window.location = `/edit-expense-page?id=${id}`
            console.log('ssss')
            document.getElementById('expense-id').value = response.data.id
            document.getElementById('expense-amount').value = response.data.amount;
            document.getElementById('expense-description').value = response.data.description
            document.getElementById('expense-category').value = response.data.category


        }
    } catch {
        (error) => {
            console.log(error)
        }
    }

}