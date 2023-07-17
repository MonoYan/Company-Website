const loginForm = document.querySelector('.login-form')
const loginWarning = document.querySelector('.login-warning')

loginForm.addEventListener('submit', async (e) => {
    // alert( ,password.value);
    loginWarning.style.display = "none"
    e.preventDefault();

    // console.log(username.value, password.value)

    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`).then(res=>res.json())
    .catch(error => {
        console.log(error)
    });

    if(res.length>0){
        location.href ="/admin/views/home/index.html"
    }else{

        loginWarning.style.display = "block"
    }

});