const logoutBtn=document.getElementById('logout-btn')

logoutBtn.addEventListener('click',logout)

function logout(){
    localStorage.clear();
    sessionStorage.clear();
    window.location='http://34.201.14.35:3000/'
}