
let expenseBtn = document.getElementById('add-expense')

//get all input elements 
let expenseAmount = document.getElementById('expense-amount')
let expenseDescription = document.getElementById('expense-description')
let expenseCategory = document.getElementById('expense-category')
let expenseList = document.getElementById('expense-list')

// add addEventListener to addExpense Button,edit and delete button 

expenseBtn.addEventListener('click', addExpense)

// edit and delete functionality 

document.getElementById('expense-list').addEventListener('click', editFunctionality)
document.getElementById('expense-list').addEventListener('click', deleteFunctionality)


//function to add expense details to local storage and on screen 

function addExpense() {
    // crate object literal for expense details
    let expenseObj = {
        amount: `${expenseAmount.value}`,
        description: `${expenseDescription.value}`,
        category: `${expenseCategory.value}`
    }


    // if corresponding key is present in local storage,find the key on screen and modify it. 

    if (localStorage.getItem(expenseObj.description)) {
        console.log('hi')
        // converting this object to string and store to local storage 
        let expenseObjString = JSON.stringify(expenseObj)
        localStorage.setItem(`${expenseObj.description}`, `${expenseObjString}`)

        let liTags = Array.from(document.getElementById('expense-list').getElementsByTagName('li'))

        // traversing all li tags and find corresponding li tag which matches given expense details 

        for (let i = 0; i < liTags.length; i++) {
            if (liTags[i].firstElementChild.textContent == expenseObj.description) {
                
                let expenseDetails = `${expenseObj.amount}-${expenseObj.category}-${expenseObj.description}`;
                
                liTags[i].childNodes[1].textContent = expenseDetails;
                break;

            }
        }

    }

    else {
        // converting this object to string and store to local storage 
        let expenseObjString = JSON.stringify(expenseObj)
        localStorage.setItem(`${expenseObj.description}`, `${expenseObjString}`)

        // putting expense deatails to screen 
        let li = document.createElement('li')
        let expenseDetails = `${expenseObj.amount}-${expenseObj.description}-${expenseObj.category}`
        // creating expense details key and append to li 
        let expenseDetailsKey = document.createElement('p')
        expenseDetailsKey.append(expenseObj.description)
        expenseDetailsKey.setAttribute('style', 'display:none')
        li.append(expenseDetailsKey)


        li.append(expenseDetails)

        // create edit button 
        let editBtn = editButton()
        //create delete button 
        let deleteBtn = deleteButton();
        //appending buttons to li 
        li.append(editBtn)
        li.append(deleteBtn)
        // append li to expense list 
        expenseList.appendChild(li)

    }
    // make all the input values to default 
    expenseAmount.value = '';
    expenseCategory.value = '';
    expenseDescription.value = '';

}

//traversing through local storage and printing all details on screen 

// taking all keys from local storage 
let localStorageKeys = Object.keys(localStorage)

for (let i = 0; i < localStorageKeys.length; i++) {
    // console.log(localStorageKeys[i])

    // get corresponding keyvalue from local storage and convert value into object using JSON.parse 
    let valueOfKey = JSON.parse(localStorage.getItem(localStorageKeys[i]))
    let expenseAmount = valueOfKey.amount;
    let expenseCategory = valueOfKey.category
    let expenseDescription = valueOfKey.description

    valueOfKey = `${expenseAmount}-${expenseCategory}-${expenseDescription}`

    //  create li element and append to expense list 
    let li = document.createElement('li')

    // create element to store key
    let expenseDetailsKey = document.createElement('p')
    expenseDetailsKey.append(expenseDescription)
    expenseDetailsKey.setAttribute('style', 'display:none')

    li.append(expenseDetailsKey)

    li.append(valueOfKey)

    // add edit and delete buttons 
    li.append(editButton())
    li.append(deleteButton())
    document.getElementById('expense-list').append(li)
}


function editFunctionality(e) {
    if (e.target.classList.contains('edit-btn')) {
        // put corresponding expense details to input boxes 
        // find corresponding key from local storage and put into input boxes 
        let key = e.target.parentNode.firstElementChild.textContent
        let keyValueObj = JSON.parse(localStorage.getItem(key))
        console.log(keyValueObj)
        expenseAmount.value = keyValueObj.amount
        expenseDescription.value = keyValueObj.description
        expenseCategory.value = keyValueObj.category

    }

}

function deleteFunctionality(e) {
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('do you want to delete')) {

            // remove the element from local storage and screen
            let key = e.target.parentNode.firstElementChild.textContent
            console.log(key)
            localStorage.removeItem(key)

            e.target.parentNode.remove()
        }

    }

}

function editButton() {
    let editBtn = document.createElement('input')
    editBtn.setAttribute('type', 'button')
    editBtn.setAttribute('value', 'Edit')
    editBtn.className = 'btn btn-outline-success btn-sm mx-1 edit-btn'
    return editBtn;

}

function deleteButton() {
    let deleteBtn = document.createElement('input')
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('value', 'Delete');
    deleteBtn.className = 'btn btn-outline-danger btn-sm delete-btn';
    return deleteBtn;
}

