// 请确保运行脚本时目标课程非满员状态,并且与已选课程无冲突
// 用例：task('在此替换你的课程名','在此替换你的课程老师名', 0/*同课程名同老师名，需要抢的课程在第几个(从0开始计数)，默认为0*/)
// Name: uestc-course-robbing
// Author: https://github.com/saafo
// Homepage: https://github.com/Saafo/uestc-course-robbing
// Version: Pre_V0.2.0 Unfinished Preview
// License: MIT-License

function task(cName, tName, cSequence) {
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
    for(i = 0; i < rows.length; i++) {
        element = rows[i];
        if(element.children[1].textContent == cName) { //课程名称
            if(element.children[3].textContent == tName) { //老师名字
                taskRow = element;
                break;
            }
        }
    }
    if(taskRow == null) {
        alert('没有找到指定的老师或课程名，请检查错误');
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
    button = taskRow.children[10];
    while(button.textContent == '选课') {
        localStorage.setItem('alertMsg','');
        localStorage.setItem('confirmMsg','');
        if(button.textContent == '选课') {
            eval(button.getAttribute('onclick')); //执行选课,但信息门户加了`X-Content-Type-Options:nosniff`参数导致无法执行，还在寻找解决方案
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
        else if(alertMsg == '' && confirmMsg.indexOf('确认') > 0) {
            var now = new Date();
            console.log(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'选课成功');
            break;
        }
    }
}