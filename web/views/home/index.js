import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-homepage")

let user = JSON.parse(isLogin())
let categoryList = ['Recent activities', 'Typical case', 'Notifications']


document.querySelector(".user-information").innerHTML = `
    <img src="${user.photo}" style="width:100px;"/>
    <div>
        <div class="username">${user.username}</div>
        <div><pre style="color: gray; white-space: pre-wrap; ">${user.information || "No personal bio available at the moment."}</pre></div>
    </div>
`


async function analyst() {
    console.log(user.username)
    let res = await fetch(`http://localhost:3000/news?author=${user.username}`)
        .then(res => res.json())
    // lodash
    let obj = _.groupBy(res, item => item.category)

    let arr = []
    for (let i in obj) {
        arr.push({
            name: categoryList[i-1],
            value: obj[i].length
        })
    }
    renderEcharts(arr)
}

function renderEcharts(data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    let option = {
        title: {
            text: 'News Published by Current User',
            subtext: 'Proportion of Different Categories',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Category',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

analyst()