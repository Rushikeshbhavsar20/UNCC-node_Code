const fs = require("node:fs/promises");

//Fails to copy filw more than 10gig because  it will flood the ram so its better to do chunks and read the file

(async ()=>{
  const result = await fs.readFile("text.txt");
  const fd1 = await  fs.open("dest.txr","w"); 
  await fd1.write(result);

});
//Doing chunks and using it afterwards
(async ()=>{
    const fd = await fs.open("text.txt","r");
    const fd1 = await  fs.open("dest.txt","w"); 
    

    let bytesread = 16384;
   
    
    while(bytesread !== 0){
         const result = await fd.read();//only read 16Kib of the data calling it again and again will real next 16Kib in the file
       
         const bytes = result.bytesRead;
        
        if(bytes !== 16384){
           const indexOffilled = result.buffer.indexOf(0);
           const newBuffer = Buffer.alloc(indexOffilled);
           result.buffer.copy(newBuffer,0,0,indexOffilled);
           await fd1.write(newBuffer);
           bytesread = bytes;
        }else{
          await fd1.write(result.buffer);

        }
    }
     

    
  })();