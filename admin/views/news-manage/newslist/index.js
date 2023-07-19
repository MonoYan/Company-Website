import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-newsList")
let category = ['Recent activities', 'Typical case', 'Notifications']
let list = []
let updateId = 0

const previewModal = new bootstrap.Modal(document.getElementById('previewModal'))
const delModal = new bootstrap.Modal(document.getElementById('delModal'))
const delConfirm = document.querySelector('.delConfirm')
const listBody = document.querySelector('#listBody')

// render
async function render() {
    let username = JSON.parse(isLogin()).username
    list = await fetch(`http://localhost:3000/news?author=${username}`)
        .then(res => res.json())
    listBody.innerHTML = list.map(item => `
        <tr>
            <th scope="row">${item.id}</th>
            <td>${item.title}</td>
            <td>${category[item.category - 1]}</td>
            <td>
                <button type="button" class="btn-preview btn btn-success btn-sm"  data-id="${item.id}">Preview</button>
                <button type="button" class="btn-edit btn btn-primary btn-sm"  data-id="${item.id}">Edit</button>
                <button type="button" class="btn-del btn btn-danger btn-sm" data-id="${item.id}">Delete</button>
            </td>
        </tr>
    `).join('')
}

listBody.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-preview")) {
        previewModal.toggle()

        let obj = list.filter(item => item.id === +e.target.dataset.id)[0]
        renderPreviewModal(obj)

    } else if (e.target.classList.contains("btn-edit")) {
        location.href = "/admin/views/news-manage/edit-news/index.html?id=" + e.target.dataset.id
    } else if (e.target.classList.contains("btn-del")) {
        updateId = e.target.dataset.id

        delModal.toggle()
    }
})
function renderPreviewModal(obj) {
    previewModalTitle.innerHTML = obj.title
    previewModalContent.innerHTML = obj.content
}

delConfirm.addEventListener('click',async ()=>{
    await fetch(`http://localhost:3000/news/${updateId}`,{
        method:"DELETE"
    }) .then(res => res.json())

    delModal.toggle()
    render()
})

render()