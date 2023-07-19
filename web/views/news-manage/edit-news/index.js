import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-newsList")

// get id
let updateId = new URL(location.href).searchParams.get("id")

let content = ""
let cover = ""

const editNewsForm = document.querySelector('.editNews-form')

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

// edit function
editNewsForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/news/${updateId}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({
            title: title.value,
            content,
            category: category.value,
            cover,
        })
    }).then(res => res.json())

    location.href = "/admin/views/news-manage/NewsList/index.html"
})

async function render() {
    const { title, category, content:myContent, cover:myCover } = await fetch(`http://localhost:3000/news/${updateId}`)
        .then(res => res.json())

        document.querySelector('#title').value = title
        document.querySelector('#category').value = category

        editor.setHtml(myContent)
        content = myContent

        cover = myCover
}

render()