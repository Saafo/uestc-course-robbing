// 请确保运行脚本时目标课程非满员状态
// 用例：task('在此替换你的课程名','在此替换你的课程老师名', 0/*同课程名同老师名，需要抢的课程在第几个(从0开始计数)，默认为0*/)
// Name: uestc-course-robbing
// Author: https://github.com/saafo
// Homepage: https://github.com/Saafo/uestc-course-robbing
// Version: Pre_V0.0.2 Unfinished Preview

function task(cName, tName, cSequence) {
    //Notification permission check
    if (window.Notification) {
        if(Notification.permission !== 'granted') {
            if(Notification.permission == 'denied') {
                alert('请允许当前页面的通知');
                return;
            }
            //default
            Notification.requestPermission(function (permission) {
                if(permission != 'granted');
                alert('请允许当前页面的通知，否则无法提醒抢课情况变化');
                throw(DOMException);
            });
        }
    } else {
        alert('请使用支持通知的浏览器，如chrome/firefox');
        return;
    }
    //Select the table
    table = null;
    table = document.getElementsByClassName('gridtable')[0];//TODO specify this name
    if(table == null) {
        alert('没有跳转到合适的页面，请检查')
        return;
    }
    //find row in the table
    tbody = table.children[1];
    rows = tbody.children;
    taskRow = null;
    rows.forEach(element => {
        if(element.children[n] == cName) {//TODO:n
            if(element.children[n] == tName) { //TODO:n
                taskRow = element;
                break;
            }
        }
    });
    if(taskRow == null) {
        alert('没有找到指定的老师或课程名，请检查错误')
        return;
    }
    for(i = 0;i < cSequence;i++) {
        taskRow = taskRow.nextElementSibling;
    }
    //Select the student number status td
    taskTd = taskRow.children[n] //TODO:n
    prevStatus = taskTd.textContent;
    //loop monitor
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    status = taskTd.textContent;
    while(status == prevStatus) {
        await sleep(5000); //TODO:ajax是5000ms刷新一次吗?
        status = taskTd.textContent;
    }
    //notify
    var Notification = new Notification(tName+' 的 '+cName+'有状态变化', {
        body: status
    });
}