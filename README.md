## uestc-course-robbing
### 电子科技大学抢课通知脚本
### 请确保运行脚本时目标课程非满员状态！！
### 目前由于信息门户在响应头中加入了`X-Content-Type-Options:nosniff`参数导致脚本失效，点击选课按钮的方案还在寻找中。如果你知道可用的方案欢迎issue与PR
用法：task('在此替换你的课程名','在此替换你的课程老师名', 0(同课程名同老师名，需要抢的课程在第几个(从0开始计数)，默认为0))  
e.g.
```js
task('大学物理','刘明春',0);
```
---
LICENSE: [MIT-License](https://github.com/Saafo/uestc-course-robbing/blob/master/LICENSE)  
请合理使用脚本，脚本造成的一切后果本人概不负责