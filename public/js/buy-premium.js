//setting header common to all requests
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

//adding an event listener to buy premium button
const buyPrimiumBtn = document.getElementById('buy-premium-btn')

buyPrimiumBtn.addEventListener('click', buyPremiumMembership)

async function buyPremiumMembership(e) {
    try {

        const response1=await axios.get('http://localhost:3000/user/is_premium')

        console.log(response1.data.isPremium)
        if(response1.data.isPremium==true)
        {
            console.log('already premium user')

            document.getElementById('buy-premium-btn').style.display='none';
            document.getElementById('premium-user').style.display='block'
            document.getElementById('message').style.display='block';
            return;

        }

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
                document.getElementById('buy-premium-link').style.display='none'
                document.getElementById('leaderboard-link').style.display='block'

                window.location='/add-expense'

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