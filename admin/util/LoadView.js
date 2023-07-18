if (localStorage.getItem("token")) {

} else {
    location.href = "/admin/views/login/index.html"
}

fetch("/admin/components/topbar/index.html").then(res => res.text()).then(res => {
    console.log(res)
    document.querySelector(".topbar").innerHTML = res
})