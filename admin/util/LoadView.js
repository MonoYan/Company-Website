function isLogin(){
    return localStorage.getItem("token")
}

function renderTopbar(user){
    let photo = document.querySelector('#topbar-photo')
    let currentUsername = document.querySelector('#currentUsername')
    let exit = document.querySelector('#exit')

    photo.src = user.photo
    currentUsername.innerHTML = user.username

    exit.onclick = ()=>{
        localStorage.removeItem("token")
        location.href = "/admin/views/login/index.html"
    }
}

function isAdmin(user){
    // console.log(user)
    if (JSON.parse(user).role !== "admin") {
        document.querySelector('#user-accordion').remove()
    }
}
async function load(id){
    let user = isLogin()
    if(user){
        let topbarText = await fetch("/admin/components/topbar/index.html").then(res => res.text())
        document.querySelector(".topbar").innerHTML = topbarText

        renderTopbar(JSON.parse(user))
        // console.log(user.photo)

        let sidemenuText = await fetch("/admin/components/sidemenu/index.html").then(res => res.text())
        document.querySelector(".sidemenu").innerHTML = sidemenuText

        document.querySelector('#'+id).style.color = "#0a58ca"
        isAdmin(user)

    }else{
        location.href = "/admin/views/login/index.html"
    }
}


export { load, isLogin }