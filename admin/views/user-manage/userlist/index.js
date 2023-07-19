import { load } from "/admin/util/LoadView.js"

load("sidemenu-userList")

const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const delModal = new bootstrap.Modal(document.getElementById('delModal'))

const editConfirm = document.querySelector('.editConfirm')
const delConfirm = document.querySelector('.delConfirm')

let list = []
let updateId = 0
let photoData = ""

// render
async function render() {
    list = await fetch("http://localhost:3000/users").then(res => res.json())
    console.log(list)
    listBody.innerHTML = list.map(item => `
        <tr">
            <th scope="row">${item.id}</th>
            <td>${item.username}</td>
            <td><img src="${item.photo}" style="width:44px;border-radius:8px"></td>
            <td>
                <button type="button" class="btn-edit btn btn-primary btn-sm"  ${item.default ? "disabled" : ""} data-id="${item.id}">Edit</button>
                <button type="button" class="btn-del btn btn-danger btn-sm" ${item.default ? "disabled" : ""} data-id="${item.id}">Delete</button>
            </td>
        </tr>
    `).join("")
}

render()

// edit modal
listBody.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-edit")) {
        // console.log("edit");
        updateId = e.target.dataset.id
        // console.log(list.filter(item => item.id === +updateId))
        // modal show
        editModal.toggle()

        let { username, password, bio, photo } = list.filter(item => item.id === +updateId)[0]
        document.querySelector('#username').value = username
        document.querySelector('#password').value = password
        document.querySelector('#bio').value = bio
        photoData = photo

    } else if (e.target.classList.contains("btn-del")) {
        // console.log("del")
        delModal.toggle()
        updateId = e.target.dataset.id
    }
});

// edit function
editConfirm.addEventListener('click', async () => {
    document.querySelector('#username').value
    document.querySelector('#password').value
    document.querySelector('#bio').value
    await fetch(`http://localhost:3000/users/${updateId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value,
            bio: document.querySelector('#bio').value,
            photo:photoData
        })
    }).then(res=>res.json())

    editModal.toggle()
    render()
})

// photo -> base64
photofile.addEventListener('change', (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (evt) => {
        photoData = evt.target.result
    }
})


// del function
delConfirm.addEventListener('click', async ()=>{
    console.log(updateId)
    await fetch(`http://localhost:3000/users/${updateId}`, {
        method: "DELETE",
    }).then(res => res.json())
    delModal.toggle()
    render()
})