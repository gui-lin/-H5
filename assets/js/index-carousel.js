//最上面的轮播图
var $pic=$("#wrap ul.pic li");
var $lib=$("#wrap ul.lib li");
var index=0;
var lenght=$pic.length;
var autoBool=true;
var time=180;
$("#wrap").mouseenter(function () {
    autoBool=false;
});
$("#wrap").mouseleave(function () {
    autoBool=true;
});

function autoPlay() {
    if (!autoBool) return;
    time--;
    if (time === 0) {
        time =180;
        next();
    }
}
/*  function autoPlay() {
      // console.log("11");
      console.log(autoBool);
      if(!autoBool) return;
      console.log(autoBool);
      time--;
      if(time===0){
          time=180;
         next();
      }
  }*/

var num=0,max=5,intervalId=null;
function incrementNumber() {
    num++;
    if(num===num){
        clearInterval(intervalId);
        play()
    }
}
intervalId=setInterval(incrementNumber,2);
$pic.eq(0).fadeIn(1).siblings().fadeOut(1);
function next(){
    // console.log("3");
    index++;
    index%=lenght;
    play();
}
function play(){
    // console.log("111");
    $pic.eq(index).fadeIn(1).siblings().fadeOut(1);
    $lib.eq(index).addClass("on").siblings().removeClass("on");
}

$lib.mouseenter(function () {
    index=$(this).index();
    $lib.eq(index).addClass("on").siblings().removeClass();
    $pic.eq(index).fadeIn().siblings().fadeOut();
});
