const http =require("http")
const https =require("https")
const url =require("url")
const fs =require("fs")

const siiii= http.createServer((req,res)=>{
    var urlObj=url.parse(req.url)
    var filePath="./www"+urlObj.pathname
    var content="not find"
    if(fs.existsSync(filePath)){
    content= fs.readFileSync(filePath)       
    }
    res.end(content.toString())



})
var io = require('socket.io')(siiii);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

  });
  
siiii.listen(8888,()=>{
    console.log("服务启动")
})