!function() {
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var container = document.getElementById('container');
    var timer;
    var index=1;

    function init(){
        prev.onclick = function() {
            index-=1;
            if(index<1)
                index=5;
            animate();
        }
        next.onclick = function() {
            index+=1;
            if(index>5)
                index=1;
            animate();
        }
        play();
        container.onmouseover = stop;
        container.onmouseout = play;
        for(var i=0,len=buttons.length;i<len;i++){
            !function(i){
                addEvent(buttons[i],"click",function(){
                    index=i+1;
                    animate();
                    buttonsShow();
                })
            }(i)

        }
    }
    init();

    //移动动画
    function animate() {
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        // var newLeft = parseInt(list.style.left) + offset;
         var newLeft = 0- (index-1)*600;
         console.log(index);
        list.style.left = newLeft + 'px';
        // if(newLeft<-2400){
        //       list.style.left = 0 + 'px';
        // }
        // if(newLeft>0){
        //       list.style.left = -2400 + 'px';
        // }
    }



    //循环播发
    function play() {
        timer = setInterval(function () {
            index+=1;
            if(index>5)
                index=1;
            animate();
        }, 1500)
    }


    //鼠标停止

    function stop() {
        clearInterval(timer);
    }


    //修改button样式 为被选中
    function buttonsShow() {
         //将之前的小圆点的样式清除
         for (var i = 0; i < buttons.length; i++) {
             if (buttons[i].className == "on") {
                 buttons[i].className = "";
             }
         }
         //数组从0开始，故index需要-1
         buttons[index - 1].className = "on";
     }



    //添加事件
    function addEvent(dom,type,fn){
        if(dom.addEventListener){
            dom.addEventListener(type,fn);
        }else if(dom.attachEvent){
            dom.attachEvent("on"+type,fn);
        }else{
            dom["on"+type]=fn;
        }
    }
}()
