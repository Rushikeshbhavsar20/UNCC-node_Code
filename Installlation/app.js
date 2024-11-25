const http = require("node:http");
const fs = require("node:fs");




const server = http.createServer();

server.on("request",(request,response)=>{
    const read = fs.readFileSync("./text.txt");
    response.setHeader("Content-Type","text/plain");
    response.end(read);
});

server.listen(4080,"127.0.0.1",()=>{
    console.log("server has started on",server.address());
    
});