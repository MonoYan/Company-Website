import {load} from "/admin/util/LoadView.js"

load("sidemenu-addUser")

const addUserForm = document.querySelector('.addUser-form')
const photofile = document.querySelector('#photofile')
let photo = ""

addUserForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    // const {username} = addUserForm
    if(password.value === cPassword.value ){
        await fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                bio: bio.value,
                photo
            })
        }).then(res => res.json())

        location.href = "/admin/views/user-manage/userlist/index.html"
    }else{
        alertText.style.display = "block"
        console.log(typeof password.value, typeof cPassword.value)
    }
})

password.addEventListener('input', () => { alertText.style.display = "none" })
cPassword.addEventListener('input', () => { alertText.style.display = "none" })

photofile.addEventListener('change', (e)=>{
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (evt)=>{
        photo = evt.target.result
    }
})