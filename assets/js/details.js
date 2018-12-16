var small = document.getElementById("small");
var mask = document.getElementById("mask");
var big = document.getElementById("big");
var bigImg = document.getElementById("bigImg");
var box = document.getElementsByClassName("fd-img")[0];
// 1、鼠标移入到小图区域  显示mask和big   离开时 隐藏

small.onmouseover = function(){
    mask.style.display = "block";
    big.style.display = "block";
};
small.onmouseout = function(){
    mask.style.display = "none";
    big.style.display = "none";
};
// 2、鼠标在小图区域上移动  改变mask的left和top   控制bigImg的left和top
small.onmousemove = function(e){
    var e = e || event;
    var x = e.pageX - box.offsetLeft - mask.offsetWidth / 2 ;
    var y = e.pageY - box.offsetTop - mask.offsetHeight / 2 ;
    var maxL = box.offsetWidth - mask.offsetWidth;
    var maxT = box.offsetHeight - mask.offsetHeight;
    x = x < 0 ? 0 : x > maxL ? maxL : x;
    y = y < 0 ? 0 : y > maxT ? maxT : y;
    mask.style.left = x + "px";
    mask.style.top = y + "px";

    var bigL = x * (bigImg.offsetWidth - big.offsetWidth) / (box.offsetWidth - mask.offsetWidth);
    var bigT = y * (bigImg.offsetHeight - big.offsetHeight) / (box.offsetHeight - mask.offsetHeight);
    bigImg.style.left = - bigL + "px";
    bigImg.style.top = - bigT + "px";
};

//加载传入数据
var obj;
var loc=window.location.href;
var imgId=decodeURIComponent(loc.split("?")[1]);
if(imgId<=39){imgId=imgId-1}
// console.log(imgId);

$.getJSON("../json/indexconfig.json",function (res) {
    obj=res[imgId];
    console.log(obj);
    var aText=document.getElementById("a-text");
    var mingzi=document.getElementById("mingzi");
    var jies=document.getElementById("jies");
    jies.textContent=obj.nam;
    aText.textContent=obj.names;
    mingzi.textContent=obj.names;
    var smallImg=document.getElementById("smallImg");
    var bigImg=document.getElementById("bigImg");
    smallImg.src=`../img/${obj.icon}`;
    bigImg.src=`../img/${obj.icon}`;
    var jiage=document.getElementsByClassName("qwq")[0];
    var saleCounts=document.getElementById("saleCounts");
    var Comments=document.getElementById("Comments");
    jiage.textContent=obj.price;
    saleCounts.textContent=obj.sales;
    Comments.textContent=obj.tzq;
});
