import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-addNews")

let content = ""
let cover = ""

const addNewsForm = document.querySelector('.addNews-form')

// WangEditor
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
        const html = editor.getHtml()
        // console.log('editor content', html)
        // 也可以同步到 <textarea>
        content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
// photo -> base64
coverFile.addEventListener('change', (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (evt) => {
        cover = evt.target.result
    }
})

// add function
addNewsForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3000/news', {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            title: title.value,
            content,
            category: category.value,
            cover: cover,
            //author
            author: JSON.parse(isLogin()).username
        })
    }).then(res=>res.json())

    location.href = "/admin/views/news-manage/NewsList/index.html"
})