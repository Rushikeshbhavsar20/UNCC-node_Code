
const fs = require("node:fs/promises");
const { pipeline } = require("node:stream/promises");
const pump = require("pump");

//piping using pipe
(async()=>{
   const fd  =  await fs.open("test.txt","r");
   const fd1  =  await fs.open("dest.txt","w");
   const readStream = fd.createReadStream();
   const  writableStream  = fd1.createWriteStream();
   readStream.pipe(writableStream);

});


//piping usinf a pipeline (can also use)

(async()=>{
   
    const fd  =  await fs.open("test.txt","r");
   const fd1  =  await fs.open("dest.txt","w");
   const readStream = fd.createReadStream();
   const  writableStream  = fd1.createWriteStream();
   

   
   pump(readStream,writableStream,(err)=>{console.log(err);
   })


 
 })();
 