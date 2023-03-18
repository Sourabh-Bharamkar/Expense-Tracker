
let expenseBtn = document.getElementById('add-expense-btn')

let expenseTable = document.getElementById('expense-table')

//setting header common to all requests
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')


// adding event listener on form submit
const addExpenseForm = document.getElementById('add-expense-form')
addExpenseForm.addEventListener('submit', addExpense)


//function to add expense details 
//saving the expense details to database and showing it on screen too 

async function addExpense(e) {

    try {
        e.preventDefault();
        //get all input elements 

        let expenseAmount = document.getElementById('expense-amount')
        let expenseDescription = document.getElementById('expense-description')
        let expenseCategory = document.getElementById('expense-category')

        //getting todays date
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        const formattedToday = dd + '/' + mm + '/' + yyyy;

        let expenseDate = formattedToday;

        //crate object of expense details entered by the user
        let expenseDetails = {
            amount: `${expenseAmount.value}`,
            description: `${expenseDescription.value}`,
            date: expenseDate,
            category: `${expenseCategory.value}`
        }

        console.log('inside add expense function')
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://localhost:3000/add-expense-details`, expenseDetails)

        console.log(response)

        let expenseDetailsHTML =
            `<tr id=${response.data.id}> 
        <td>${response.data.amount}</td> 
        <td>${response.data.description}</td>
        <td>${response.data.date}</td> 
        <td>${response.data.category}</td> 
        <td><button class='edit-btn' >Edit</button>
        <button class='delete-btn'>Delete</button></td>
        </tr>`

        document.getElementById('expense-table-body').insertAdjacentHTML('beforeend', expenseDetailsHTML)

        //showing succcess message on form
        document.getElementById('form-submit-message').textContent = 'Successfully added...'
        setTimeout(() => {
            document.getElementById('form-submit-message').textContent = ""
        }, 3000)

        // make all the input values to default 

        document.getElementById('expense-amount').value = ""
        document.getElementById('expense-description').value = ""
        document.getElementById('expense-category').value = ""

    } catch (error) {
        console.log(error)
    }

}


//get all expense details from server and show them on user screen 
//adding event handler to  DOMContentLoaded

window.addEventListener('DOMContentLoaded', getAllExpensesFromServer)

async function getAllExpensesFromServer() {

    try {
        console.log('entered into getAllExpensesFromServer function')
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/expenses')
        let expenseDetails = response.data;
        console.log(response.data)
        expenseDetails.forEach((element) => {

            let expenseDetailsHTML =
                `<tr id=${element.id}> 
            <td>${element.amount}</td> 
            <td>${element.description}</td>
            <td>${element.date}</td>
            <td>${element.category}</td> 
            <td><button class='edit-btn'>Edit</button>
            <button class='delete-btn'>Delete</button></td>
            </tr>`

            document.getElementById('expense-table-body').insertAdjacentHTML('beforeend', expenseDetailsHTML)


        })

        //check whether user is primium user or not
        //if he is premium user remove the buy premium button and show he is premium user

        const response1 = await axios.get('http://localhost:3000/user/is_premium')
        if (response1.data.isPremium == true) {
            document.getElementById('buy-premium-btn').style.display = "none";
            document.getElementById('premium-user').style.display = "block";
            document.getElementById('leaderboard-btn').style.display = "block";

        }



    } catch (error) {

        console.log(error)

    }

}

//adding delete functionality
expenseTable.addEventListener('click', deleteExpense)

async function deleteExpense(e) {

    try {
        if (e.target.classList.contains('delete-btn')) {
            const response = window.confirm('Do you want delete expense?')
            if (response) {

                let id = e.target.parentNode.parentNode.id;
                const response = await axios.get(`http://localhost:3000/delete-expense/${id}`)

                // delete target element from screen also
                e.target.parentNode.parentNode.remove();

            }
        }

    } catch (error) {
        console.log(error)
    }

}

//add edit functionality
expenseTable.addEventListener('click', autoFillEditExpenseForm)

async function autoFillEditExpenseForm(e) {
    try {

        if (e.target.classList.contains('edit-btn')) {

            console.log('inside edit expense function')
            let id = e.target.parentNode.parentNode.id;

            const editExpenseModal = document.getElementById('edit-expense-modal')

            editExpenseModal.style.display = 'block';

            const response = await axios.get(`http://localhost:3000/expense-details/${id}`)
            console.log(response.data)

            document.getElementById('edit-expense-id').value = response.data.id
            document.getElementById('edit-expense-amount').value = response.data.amount;
            document.getElementById('edit-expense-description').value = response.data.description
            document.getElementById('edit-expense-category').value = response.data.category

        }
    } catch (error) {
        console.log(error)
    }

}

//adding event listener to edit expense button

const editExpenseForm = document.getElementById('edit-expense-form')

editExpenseForm.addEventListener('submit', editExpense)

async function editExpense(e) {
    try {
        e.preventDefault();

        const expenseDetails = {
            id: document.getElementById('edit-expense-id').value,
            amount: document.getElementById('edit-expense-amount').value,
            description: document.getElementById('edit-expense-description').value,
            category: document.getElementById('edit-expense-category').value
        }

        const response1 = await axios.post(`http://localhost:3000/edit-expense`, expenseDetails)
        const updatedExpenseDetails = response1.data;

        //edit corresponding expense item from screen too
        const expenseTableBodyElements = document.getElementById('expense-table-body').children

        Array.from(expenseTableBodyElements).forEach((element) => {
            if (element.id == response1.data.id) {
                element.innerHTML = `<td>${updatedExpenseDetails.amount}</td> 
                <td>${updatedExpenseDetails.description}</td>
                <td>${updatedExpenseDetails.date}</td>
                <td>${updatedExpenseDetails.category}</td> 
                <td><button class='edit-btn'>Edit</button>
                <button class='delete-btn'>Delete</button></td>`
            }
        })

        closeModal();

    } catch (error) {
        console.log(error)
    }

}

// Get the modal
let addExpenseModal = document.getElementById("add-expense-modal");
let editExpenseModal = document.getElementById("edit-expense-modal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let closeButton = document.getElementsByClassName("close");


// When the user clicks the button, open the modal 
btn.onclick = function () {
    addExpenseModal.style.display = "block";

}

// When the user clicks on close button (x), close the modal
Array.from(closeButton).forEach((element) => {
    element.addEventListener('click', closeModal)

})

function closeModal() {
    addExpenseModal.style.display = "none";
    editExpenseModal.style.display = "none";

}


// When the user clicks anywhere outside of the modal, close it

window.addEventListener('click', modalDisplayOff)

function modalDisplayOff(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none'
    }
}

//adding an event listener to buy premium button
const buyPrimiumBtn = document.getElementById('buy-premium-btn')

buyPrimiumBtn.addEventListener('click', buyPremiumMembership)

async function buyPremiumMembership(e) {
    try {

        const response = await axios.get('http://localhost:3000/purchase/primium_membership')

        let options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                await axios.post('http://localhost:3000/purchase/update_transaction_status', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                    status: 'SUCCESSFUL',
                    isPremiumMember: true
                })

                window.alert('Congratulation!! You are now premium user now..')
                document.getElementById('premium-user').style.display = 'block';
                document.getElementById('buy-premium-btn').style.display = 'none';

            }
        }

        //initialize razorpay 
        const rzp = new Razorpay(options)
        rzp.open();
        e.preventDefault();

        rzp.on('payment.failed', (response) => {
            axios.post('http://localhost:3000/purchase/update_transaction_status', {
                order_id: options.order_id,
                payment_id: null,
                status: 'FAILED',
                isPremiumMember: false
            })
            window.alert('something went wrong')
        })

    } catch (error) {
        console.log(error)
    }
}


// adding an eventlistener to show leaderboard button 

const leaderboardBtn=document.getElementById('leaderboard-btn')

leaderboardBtn.addEventListener('click',showLeaderboard)

async function showLeaderboard(){

    const leaderboard_table=document.getElementById('leaderboard-table')


    const response= await axios.get('http://localhost:3000/premium/show_leaderboard')

    response.data.forEach((user)=>{

        let userDetails=`<tr>
        <td>${user.name}</td>
        <td>${user.total_expense}</td>
        </tr>`

        console.log(userDetails)
        document.getElementById('leaderboard-table-body').insertAdjacentHTML('beforeend',userDetails)
        
    })
    
}