var http=require("http");
var arr=[];
var server=http.createServer(function (req,res) {
    var data="";
    req.on("data",function (d) {
        data+=d;
    });
    req.on("end",function () {
        var reqObj=JSON.parse(data);
        res.writeHead(200,{"content-type":"text/plain",'Access-Control-Allow-Origin':'*'});
        if(reqObj.type===2){
            arr.push(reqObj);
            res.write(JSON.stringify(arr))
        }else if(reqObj.type===1){
            for(var i=0;i<arr.length;i++){
                if(reqObj.username===arr[i].username&&reqObj.password===arr[i].password){
                res.write("找到了")
            }else {
                res.write("没找到")
                }
            }

        }
        res.end();
    })
});
server.listen(1005,'localhost',function () {
   console.log("服务开启")
});