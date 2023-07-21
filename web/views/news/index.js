import { load } from "/web/util/LoadView.js"

load("topbar-news")

const search = document.querySelector('#search')
const cardContainer = document.querySelector('.card-container')
let list = []
const tab1 = document.querySelector('#tab0')
const tab2 = document.querySelector('#tab1')
const tab3 = document.querySelector('#tab2')


search.addEventListener('input', async () => {
    console.log(search.value)
    if (!search.value) {
        document.querySelector('.list-group').style.display = "none"
        return
    }

    let res = await fetch(`http://localhost:3000/news?title_like=${search.value}`).then(res => res.json())
    document.querySelector('.list-group').style.display = "block"

    document.querySelector('.list-group').innerHTML = res.map(item => `
         <li class="list-group-item"><a href="/web/views/detail/index.html?id=${item.id}">${item.title}</a></li>
    `).join("")
})

search.onblur = () => {
    setTimeout(() => {
        document.querySelector('.list-group').style.display = "none"
    }, 400)
}

async function render() {
    await renderList()
    await renderTap()
}

async function renderList() {
    list = await fetch("http://localhost:3000/news").then(res => res.json())
    cardContainer.innerHTML = list.reverse().slice(0, 4).map(item => `
                <div class="card" data-id="${item.id}">
                        <div class="cardCover" style="background-image: url(${item.cover});" ></div>
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.author}</p>
                        </div>
                </div>
    `).join("")
    for (let item of document.querySelectorAll('.card')) {
        item.onclick = () => {
            location.href = `/web/views/detail/index.html?id=${item.dataset.id}`
        }
    }
}

function renderTap() {
    let categoryObj = _.groupBy(list, item => item.category)
    console.log(categoryObj)
    let tabs = [tab1, tab2, tab3]
    tabs.forEach((item, index) => {
        // console.log(categoryObj[index + 1]);
        item.innerHTML = categoryObj[index + 1].map(item =>
            `
            <div class="list-item" data-id="${item.id}">
                <img src="${item.cover}" data-id="${item.id}"/>
                <div class="item-title" data-id="${item.id}">${item.title}</div>
                <p class="card-text" data-id="${item.id}">${item.author}</p>
            </div>

            `).join("") || ""

        item.addEventListener('click', (e) => {
            location.href = `/web/views/detail/index.html?id=${e.target.dataset.id}`
        })
    })
}

render()