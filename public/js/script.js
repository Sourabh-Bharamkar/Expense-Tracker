
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
        let expenseId=document.getElementById('expense-id')
        let expenseAmount = document.getElementById('expense-amount')
        let expenseDescription = document.getElementById('expense-description')
        let expenseCategory = document.getElementById('expense-category')

        //crate object of expense details entered by the user
        let expenseDetails = {
            id:`${expenseId.value}`,
            amount: `${expenseAmount.value}`,
            description: `${expenseDescription.value}`,
            category: `${expenseCategory.value}`
        }

        console.log('inside add expense function')

        const response = await axios.post(`http://localhost:3000/add-expense-details`, expenseDetails)

        let expenseDetailsHTML = `<li id=${response.data.id}>${response.data.amount}-${response.data.category}-${response.data.description} <input type='button' class='btn btn-outline-success btn-sm mx-1 edit' value='Edit'>  <input type='button' class='btn btn-outline-danger btn-sm mx-1 delete' value='Delete'> </li>`

        //check is there any expense details with this id available on screen
        //if yes, replace it 

        const expenseList=Array.from(document.getElementById('expense-list').children)
        console.log(expenseList);

        let elementFound=false;

        expenseList.forEach((element)=>{

            if(element.id==response.data.id)
            {
                elementFound=true;
                element.firstChild.textContent=`${response.data.amount}-${response.data.category}-${response.data.description}`
            }
        })

        console.log(elementFound)

        //if there is no any expense details present with this id then add this new expense details at last

        if(!elementFound){
            document.getElementById('expense-list').insertAdjacentHTML('beforeend', expenseDetailsHTML)
        }
       
        // make all the input values to default 

        document.getElementById('expense-id').value = ""
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

            let expenseDetailsHTML = `<li id=${element.id}> ${element.amount}-${element.category}-${element.description} <input type='button' class='btn btn-outline-success btn-sm mx-1 edit' value='Edit'>  <input type='button' class='btn btn-outline-danger btn-sm mx-1 delete' value='Delete'> </li>`

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