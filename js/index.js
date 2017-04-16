/* 
* @Author: anchen
* @Date:   2016-11-25 14:16:36
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-06 11:34:45
*/
//图标的数据
var data = [
    {id:1,pid:'computer',title:'我的电脑'},
    {id:2,pid:'calendar',title:'日历'},
    {id:3,pid:'recover',title:'回收站'},
    {id:4,pid:'music',title:'QQ音乐'},
    {id:5,pid:'browser',title:'浏览器'}
];

//模拟右键系统菜单的部分
//
var obj = {
    menu:document.querySelector('.menu'),
    h4:document.querySelectorAll('h4'),
    uls:document.querySelectorAll('.menu ul'),
    desktop:document.querySelector('.desktop'),
    num:0
}
//当在桌面上的图标上右击时，不能显示系统菜单的禁止
obj.desktop.oncontextmenu = function(ev){
    if(ev.target.parentNode.className === 'file' || ev.target.className === 'file'){
            obj.menu.style.display = 'none';
            ev.cancelBubble = true;
            return false;
    }
}

//给图标定义位置
function filePosition(space){

    var col = 1,
    row = 0,
    space = space || 120,
    por = 10,
    mainH = document.documentElement.clientHeight || document.body.clientHeight,
    iNow = ~~(mainH/space);

    $('.file').each(function(index,elem){
        if(index>=iNow*col){
            col++;
            row = 0;
        }
        $(elem).animate({
            left:por+(space*(col-1)),
            top:por+(space*row),
            transform:'scale(1.2)'
        }),{
            easing:'linear',
            during:300
        }
        row++;
    })
    

}


//仿windows的拖拽操作
obj.desktop.onmousedown = function(ev){
    if(ev.target.parentNode.className === 'file' || ev.target.className === 'file'){
        var L = 0,
        T = 0;
        var event = ev.target.className === 'file'?ev.target:ev.target.parentNode;
        

            var disX = ev.clientX - event.offsetLeft;
            var disY = ev.clientY - event.offsetTop;
            var html = '';

            // html = `<div class="file" style="opacity:.4">
            //     <div class="${event.children[0].className}"></div>
            //     <p class="text">${event.children[1].innerHTML}</p>
            // </div>`;
            // obj.desktop.innerHTML += html;
            // innerHTML 的形式是把之前的取出来，然后再把整个结构重新绘制
            // console.log(event,event.offsetLeft)

            var f = document.createElement('div');
            f.className = 'file';
            f.style.opacity = '.4';
            html = `<div class="${event.children[0].className}"></div>
                    <p class="text">${event.children[1].innerHTML}</p>`;
            f.innerHTML = html;
            obj.desktop.appendChild(f);
            

            var last = obj.desktop.lastElementChild;
            last.style.cssText += 'zIndex:20;top:'+event.offsetTop+'px;left:'+event.offsetLeft+'px';
            L = event.offsetLeft;
            T = event.offsetTop;
            document.addEventListener('mousemove', fnmove);
            document.addEventListener('mouseup', fnup);
            //阻止浏览器的默认行为
            return false;
            function fnmove(ev){
                L = ev.clientX - disX;
                T = ev.clientY - disY;


                var r1 = L + event.offsetWidth;
                var b1 = T + event.offsetHeight;

                last.style.top = ev.clientY - disY + 'px';
                last.style.left = ev.clientX - disX +'px';
            }
            function fnup(){
                document.removeEventListener('mousemove', fnmove);
                document.removeEventListener('mouseup', fnup);
                obj.desktop.removeChild(last);
                event.style.top = T +'px';
                event.style.left = L +'px';
                //碰撞检测
                // var l1 = ev.pageX - disX;
                // var t1 = ev.pageY - disY;
                // var r1 = l1 + event.offsetWidth;
                // var b1 = t1 + event.offsetHeight;
                
                // /*
                //     获取要碰撞元素的上下左右的位置 
                // */
                // // var l2 = div2.offsetLeft;
                // // var t2 = div2.offsetTop;
                // // var r2 = l2 + div2.offsetWidth;
                // // var b2 = t2 + div2.offsetHeight;
                // var elements = obj.desktop.children;
                // for(var i=0;i<elements.length;i++){
                //     console.log(elements[i])
                //     if(r1 < elements[i].offsetLeft || b1 < elements[i].offsetTop || l1 > elements[i].offsetLeft+elements[i].offsetWidth || t1 > elements[i].offsetTop+elements[i].offsetHeight){
                //         // elements[i].style.top = 0;
                //        alert('没碰');
                //     }else{
                //          alert("碰撞了！");
                //     }
                // }
                
                
            }
        
    }
}

    createFile(data);
    filePosition();
    window.onresize = function(){
        // createFile(data);
        filePosition();
        
    }//有延迟问题
//渲染图标
function createFile(data){
    var str = '';
    for(var i=0;i<data.length;i++){
        str += `<div class="file">
                <div class="fileIcon ${data[i].pid}"></div>
                <p class="text">${data[i].title}</p>
            </div>`;       
    }
    obj.desktop.innerHTML = str;
}
var build = {
    newFolder:function(){
        //存数据
        var newArr = {
            id:a++,
            pid:'paper',
            title:'新建文件夹'+(++obj.num)
        }
        data.push(newArr);
        //新建文件夹加结构
        var a = data.length;
        str = `<div class="file">
                <div class="fileIcon paper"></div>
                <p class="text">${'新建文件夹'+obj.num}</p>
            </div>`;
        obj.desktop.innerHTML += str;
        //给新建的文件夹位置
        filePosition();
    },
    bigIco:function(){
        for(var i=0;i<obj.desktop.children.length;i++){
            obj.desktop.children[i].style.transform = 'scale(1.2)';
        }

        filePosition(140);
    },
    mediumIco:function(){
         for(var i=0;i<obj.desktop.children.length;i++){
            obj.desktop.children[i].style.transform = 'scale(1)';
        }
        filePosition();
    },
    smallIco:function(){
        for(var i=0;i<obj.desktop.children.length;i++){
            obj.desktop.children[i].style.transform = 'scale(.9)';
        }
        filePosition(110);
    },
    //刷新
    refresh:function(){
        // window.reload = 
    }
}

//点击菜单某一项时，进行相应的操作
obj.menu.onclick = function(ev){
    var str = '';
    if(ev.target.tagName === 'H4'&&!ev.target.nextElementSibling){
        //点击新建时

        switch(ev.target.innerHTML){
            case '新建文件夹':
                build.newFolder();
                break;
            case '大图标':
                build.bigIco();
                break;
            case '中等图标':
                build.mediumIco();
                break;
            case '小图标':
                build.smallIco();
                break;
            case '刷新':
                build.refresh();
                break;
            default:
                console.log('完了');

        }

        obj.menu.style.display = 'none';
    }
    ev.cancelBubble = true;
}
/*
清ul的class
    通过当前的h4找到父级li的父级ul，ul.children就找到所有的li，排除当前的li，清楚别的li下的ul的class
    事件委托
*/
obj.menu.onmouseover = function(ev){
    
    if(ev.target.tagName === 'H4'){
        var h4 = ev.target;
        var li = h4.parentNode;
        var ul = li.parentNode;
        var lis = ul.children;
        //把lis的兄弟节点的ul全部清除
        for(var i=0;i<lis.length;i++){
            var uls = lis[i].getElementsByTagName('ul');
            for(var j=0;j<uls.length;j++){
                uls[j].className = '';
            }
        }
        for(var i=0;i<obj.h4.length;i++){
            obj.h4[i].className = '';
        }
        addH4Class(ev.target);
        //第一级的li变颜色
        ev.target.className = 'active';
        if(ev.target.nextElementSibling){
            ev.target.nextElementSibling.className = 'show';
        }
    }
    
}
/*清H4身上的class
            先把所有清掉，把与当前h4相关的h4给添加。
        */
function addH4Class(obj){
    var ul = obj.parentNode.parentNode;
    if(ul.previousElementSibling.tagName === 'H4'){
        ul.previousElementSibling.className = 'active';
        addH4Class(ul.previousElementSibling);
    }else{
        return;
    }
}

document.onclick = function(){
    obj.menu.style.display = 'none';
}

//鼠标移走
obj.menu.onmouseleave = function(){
    for(var i=0;i<obj.uls.length;i++){
        obj.uls[i].className = '';
    }
    for(var i=0;i<obj.h4.length;i++){
        obj.h4[i].className = '';
    }
}

//oncontextmenu 浏览器右击
document.oncontextmenu = function(ev){
    obj.menu.style.display = 'block';
    console.log(obj.menu.offsetTop)
    obj.menu.style.top = ev.pageY + 'px';
    obj.menu.style.left = ev.pageX + 'px';
    return false;
}