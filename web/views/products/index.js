import { load } from "/web/util/LoadView.js"
const indicators = document.querySelector(".carousel-indicators")
const carouselInner = document.querySelector(".carousel-inner")
load("topbar-products")

async function render() {
    let list = await fetch("http://localhost:3000/products").then(res => res.json())
    console.log(list)
    carouselInner.innerHTML = list.map((item, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${item.cover}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>${item.title}</h5>
            <p>${item.introduction}</p>
        </div>
    </div>
    `).join("");

}



render()