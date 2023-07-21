import { load } from "/web/util/LoadView.js"

load("topbar-news")

async function render() {
    let id = new URL(location.href).searchParams.get("id")
    console.log(id)
    let { title, author, content } = await fetch(`http://localhost:3000/news/${id}`).then(res => res.json())

    document.querySelector('.title').innerHTML = title
    document.querySelector('.author').innerHTML = author
    document.querySelector('.news-content').innerHTML = content

}

render()