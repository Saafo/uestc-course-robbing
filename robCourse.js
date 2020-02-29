// 请确保运行脚本时目标课程非满员状态,并且与已选课程无冲突
// 用例：task('在此替换你的课程名','在此替换你的课程老师名', 0/*同课程名同老师名，需要抢的课程在第几个(从0开始计数)，默认为0*/)
// Name: uestc-course-robbing
// Author: https://github.com/saafo
// Homepage: https://github.com/Saafo/uestc-course-robbing
// Version: Pre_V0.1.0 Unfinished Preview
// License: MIT-License

function task(cName, tName, cSequence) {
    //Notification permission check
    if (window.Notification) {
        if(Notification.permission !== 'granted') {
            if(Notification.permission == 'denied') {
                alert('请允许当前页面的通知');
                return;
            }
            //default
            console.log('请允许当前页面的通知')
            Notification.requestPermission().then(function (permission) {
                if(permission != 'granted') {
                    alert('请允许当前页面的通知，否则无法提醒抢课情况变化');
                    return;
                }
            });
        }
    } else {
        alert('请使用支持通知的浏览器，如chrome/firefox');
        return;
    }
    //Select the table
    table = null;
    table = document.getElementById('electableLessonList');
    if(table == null) {
        alert('没有跳转到合适的页面，请检查')
        return;
    }
    //find row in the table
    tbody = table.children[1];
    rows = tbody.children;
    taskRow = null;
    try {
        rows.forEach(element => {
            if(element.children[1] == cName) { //课程名称
                if(element.children[3] == tName) { //老师名字
                    taskRow = element;
                    throw(new Error("StopIteration"));
                }
            }
        });        
    } catch (Error) {
        console.log('找到课程');
    }
    if(taskRow == null) {
        alert('没有找到指定的老师或课程名，请检查错误')
        return;
    }
    for(i = 0;i < cSequence;i++) {
        taskRow = taskRow.nextElementSibling;
    }
    // 存储课程id
    localStorage.setItem('taskCourseId',taskRow.getAttribute('id'));
    //Select the student number status td
    // taskTd = taskRow.children[8] //选课人数情况
    //loop & rub
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    //Rewrite
    window.alert=function(str) {
        this.localStorage.setItem('alertMsg',str);
        console.log('alert:'+str);
    }
    window.confirm=function(str) {
        this.localStorage.setItem('confirmMsg',str);
        console.log('confirm:'+str);
        return true;
    }
    // status = taskTd.textContent;
    // while(status.slice(-2,) == '/0') { //当满员时循环
    //     var now = new Date();
    //     console.log(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'已刷新：'+status);
    //     await sleep(5000); //TODO:ajax是5000ms刷新一次吗?
    //     status = taskTd.textContent;
    // }
    button = taskRow.children[10];
    while(button.textContent == '选课') {
        localStorage.setItem('alertMsg','');
        localStorage.setItem('confirmMsg','');
        if(button.textContent == '选课') {
            eval(button.getAttribute('onclick')); //执行选课
        } else {
            console.log('已经选课');
            return;
        }
        alertMsg = localStorage.getItem('alertMsg');
        confirmMsg = localStorage.getItem('confirmMsg');
        if(confirmMsg.indexOf('冲突') > 0) {
            console.log('课程冲突，请手动取消冲突课程');
        }
        else if(alertMsg.indexOf('人数已满') > 0) {
            status = taskTd.textContent;
            var now = new Date();
            console.log(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'已刷新：'+status);
            await.sleep(3000);
            taskRow = document.getElementById(localStorage.getItem('taskCourseId'));
            button = taskRow.children[10];
            continue;
        }
        else if(alertMsg.indexOf('冲突') > 0) {
            console.log('课程冲突，请手动取消冲突课程');
            return;
        }
        else if(alertMsg == '') {
            console.log(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'选课成功');
            break;
        }
    }
    //notify
    var Notification = new Notification('选课成功', {
        body: tName+' 的 '+cName+' 选课成功'
    });
}