
function init() {
    var wineName=["西凤","青稞酒","洋河","习酒","小糊涂仙","酒鬼酒","张裕","拉菲","董酒","华夏长城"];

    var baiJiu=["泸州老窖","洋河","剑南春","牛栏山","红星","西凤","国窖1573","小糊涂仙","郎酒","习酒","鸭溪窖","汾酒","董酒","酒鬼贵","一道鸿","五粮液","衡水老白干","更多"];
    var jiuming=document.getElementById("jiuming");
    var ljBai=document.getElementById("lj-bai");
    cerateA(wineName,jiuming);
    cerateA(baiJiu,ljBai)
}

//创建a标签
function cerateA(arr,poss) {
    for(var i=0;i<arr.length;i++){
        var a=document.createElement("a");
        a.href="#";
        a.textContent=arr[i];
        poss.appendChild(a)
    }
}



var prvePosition=1;

var arr1=Array.from($(".prev"));
var arr2=Array.from($(".next"));

for(var i=0;i<arr1.length;i++){
    arr1[i].addEventListener("click",prevClickHandler);

}
for(var i=0;i<arr2.length;i++){
    arr2[i].addEventListener("click",nextClickHandler);

}

function prevClickHandler(e) {
    var box=  this.nextElementSibling.nextElementSibling.firstElementChild;
    if (prvePosition>2) prvePosition=1;

    console.log()
    box.style.left="-188"*prvePosition+"px";
    prvePosition++;
    // console.log("aaa")
    console.log(prvePosition);

}

function nextClickHandler(e) {

    prvePosition--;

    if (prvePosition<-2){prvePosition=1;} else{
    var box=this.nextElementSibling.firstElementChild;
    box.style.left="188"*prvePosition+"px";
    console.log("aaa")}

    console.log(prvePosition)
}


var zuo=document.getElementsByClassName("zq_prev")[0];
var you=document.getElementsByClassName("zq_next")[0];

/*zuo.addEventListener("click",lunbozClickHandler);
you.addEventListener("click",lunboyClickHandler);

function lunboClickzHandler(e) {

}*/


function play() {
    // console.log("aaaa")
}
var j=1;
var a=1;
var b=1;
var c=1;
// 通过json数据创建元素
$.getJSON("./assets/json/indexconfig.json",function (res) {
    // console.log(res);
    var rexiao=document.getElementById("rx");
    for(var i=0;i<10;i++){
        var li=createLi(res[i]);
        rexiao.appendChild(li)
    }
    var fore=document.getElementById("fore");
    for(var i=10;i<15;i++){
        var li1=createLi1(res[i],j);
        fore.appendChild(li1);
        j++
    }
    var bibei=document.getElementById("bibei");
    for(var  i=15;i<25;i++){
        var jiu=createLiSt(res[i]);
        bibei.appendChild(jiu)
    }
    var songli=document.getElementById("songli");
    for(var  i=25;i<31;i++){
        var aaa=createLiSt(res[i]);
        songli.appendChild(aaa)
    }
    var xijiu=document.getElementById("xijiu");
    for(var i=31;i<35;i++){
        var li2=createLi(res[i]);
        xijiu.appendChild(li2);
    }
    var tang=document.getElementById("tang");
    for(var i=35;i<40;i++){
        var asa=createLi1(res[i],a);
        tang.appendChild(asa);
        a++;
    }
    var yue1=document.getElementById("yue1");
    for(var i=40;i<44;i++){
        var li3=createLi(res[i]);
        yue1.appendChild(li3);
    }
    var tang1=document.getElementById("tang1");
    for(var i=44;i<48;i++){
        var li4=createLi(res[i]);
        tang1.appendChild(li4);
    }
   var tz=document.getElementById("tz");
    for(var i=48;i<53;i++){
        var li5=createLi1(res[i],b);
        tz.appendChild(li5);
        b++;
    }
    var tang3=document.getElementById("tang3");
    for(var i=53;i<58;i++){
        var q1=createLi1(res[i],c);
        tang3.appendChild(q1);
        c++;
    }
    var tangy=document.getElementById("tangy");
    for(var i=58;i<62;i++){
        var f=createLi(res[i]);
        tangy.appendChild(f);

    }
    var lunbo=document.getElementById("lunbo");
    // var lunbo3=document.getElementById("lunbo3");
    for(var i=62;i<77;i++){
        var q=createLi(res[i]);
        lunbo.appendChild(q);
        // lunbo3.appendChild(q);
    }
    var lunbo2=document.getElementById("lunbo2");
    for(var i=76;i>62;i--){
        var q1=createLi(res[i]);
        lunbo2.appendChild(q1);
    }


});
// 创建热销热销爆款
function createLi(obj) {
    var li=document.createElement("li");
    var a=document.createElement("a");
    a.href="assets/html/details.html?"+obj.id;
    li.appendChild(a);
    var img=new Image();
    img.src=`assets/img/${obj.icon}`;
    a.appendChild(img);
    // console.log(obj)
    return li
}
// 创建Hot!热卖
function createLi1(obj,j) {
    var li1=document.createElement("li");
    var a=document.createElement("a");
    a.href="assets/html/details.html?"+obj.id;;
    li1.className=`fore${j}`;
    li1.appendChild(a);
    var img=new Image();
    img.src=`assets/img/${obj.icon}`;
    a.appendChild(img);
    return li1;
}
// 创建其他
function createLiSt(obj) {
    if(jiu){jiu.remove();}
    var jiu=document.createElement("li");
    var a=document.createElement("a");
    a.href="assets/html/details.html?"+obj.id;;
    jiu.appendChild(a);
    var img=new  Image();
    img.src=`assets/img/${obj.icon}`;
    // console.log(obj);
    jiu.appendChild(img);
    var p=document.createElement("p");
    p.className="ren";
    p.textContent=`${obj.price}`;
    jiu.appendChild(p);
    var p1=document.createElement("p");
    // p1.className="ren";
    p1.textContent=`${obj.names}`;
    jiu.appendChild(p1);
    return jiu;
}






//    鼠标滑过对应的显示

$(".item").bind({
        "mouseenter":function (e) {
            var arr=Array.from($(".item"));
            var index=arr.indexOf(this);
            var arr1=Array.from($(".hidden"));
            $(".hidden").eq(index).css("display","block");
        },
        "mouseleave":function (e) {
            var arr=Array.from($(".item"));
            var index=arr.indexOf(this);
            var arr1=Array.from($(".hidden"));
            $(".hidden").eq(index).css("display","none");
        }
    });

//鼠标滑过li
$(".right_top_box1:not(:first)").fadeOut(1);
$(".dong2:not(:first)").fadeOut(1);
$(".hua1").hover( function () {
    var arr=Array.from($(".hua1"));
    var index=arr.index=arr.indexOf(this);
    $(".right_top_box1:visible").fadeOut(100);
    $(".right_top_box1").eq(index).fadeIn(100);
},aaa());
$(".hua2").hover( function () {
    var arr=Array.from($(".hua2"));
    var index=arr.index=arr.indexOf(this);
    $(".dong2:visible").fadeOut(100);
    $(".dong2").eq(index).fadeIn(100);
},aaa());
$(".hua3").hover( function () {
    var arr=Array.from($(".hua3"));
    var index=arr.index=arr.indexOf(this);
    $(".dong3:visible").fadeOut(100);
    $(".dong3").eq(index).fadeIn(100);
},aaa());
$(".hua4").hover( function () {
    var arr=Array.from($(".hua4"));
    var index=arr.index=arr.indexOf(this);
    $(".dong4:visible").fadeOut(100);
    $(".dong4").eq(index).fadeIn(100);
},aaa());
function aaa() {
    // console.log("离开")
}
