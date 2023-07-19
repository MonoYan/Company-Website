import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-homepage")

let user = JSON.parse(isLogin())

document.querySelector(".user-information").innerHTML = `
    <img src="${user.photo}" style="width:100px;"/>
    <div>
        <div class="username">${user.username}</div>
        <div><pre style="color: gray; white-space: pre-wrap; ">${user.information ||"No personal bio available at the moment."}</pre></div>
    </div>
`