//setting header common to all requests
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')


// adding an eventlistener on domcontentloaded

window.addEventListener("DOMContentLoaded", showLeaderboard)

async function showLeaderboard() {
    try {
        checkUserIsPremiumOrNot();

        const leaderboard_table = document.getElementById('leaderboard-table')

        const response = await axios.get('http://localhost:3000/premium/show_leaderboard')

        console.log(response)
        let rank = 1
        response.data.forEach((user) => {

            let userDetails = `<tr>
        <td>${rank}</td>
        <td>${user.name}</td>
        <td>${user.totalExpense}</td>
        </tr>`

            //increment the rank
            rank++;
            console.log(userDetails)
            document.getElementById('leaderboard-table-body').insertAdjacentHTML('beforeend', userDetails)

        })
    } catch (error) {
        console.log(error)
    }


}

async function checkUserIsPremiumOrNot() {
    try {

        const response1 = await axios.get('http://localhost:3000/user/is_premium')
        if (response1.data.isPremium == true) {
            document.getElementById('leaderboard-link').style.display = 'block';
            document.getElementById('expense-report').style.display = "block";
            document.getElementById('premium-user').style.display = "block";

        }

    } catch (error) {
        console.log(error)
    }

}