const { Transform } = require("node:stream");
const fs = require("node:fs/promises");
class encrypt_transform extends Transform{  //use to encrypt read.txt
      
    _transform(chunk,encoding,callback){
      const buffer = Buffer.alloc(chunk.length);
      for(let i=0;i<chunk.length;i++){
          buffer[i] = chunk[i]+1;
          
      } 
      this.push(buffer); 
      callback();
    }
}

class decrypt_transform extends Transform{//use to decrypt the read.txt
      
    _transform(chunk,encoding,callback){
      const buffer = Buffer.alloc(chunk.length);
      for(let i=0;i<chunk.length;i++){
          buffer[i] = chunk[i] - 1;
          
      } 
      this.push(buffer); 
      callback();
    }
}



(async()=>{
   const fd = await fs.open("./read.txt","r");// read.txt xonsits data to encrypt 
   const fd2 = await fs.open("./write.txt","w")//encryotes data is stored in write.txt

   const fd3 = await fs.open("./write.txt","r");//write.txt is opened as r to read encypted to perform decrytion on it
   const fd4 = await fs.open("./decrypted.txt","w")//will show real data  in decryted.txt file
   

   const readFile = fd.createReadStream();
   const writeFile = fd2.createWriteStream();

   const readFile2 = fd3.createReadStream();
   const writeFile2 = fd4.createWriteStream();
   
   const encrypt = new encrypt_transform()
   const decrypt = new decrypt_transform();

   readFile.pipe(encrypt).pipe(writeFile);
//eaits for readFile to complete and then decrypts it;
   readFile.on('end',()=>{
    fd.close();
    fd2.close();
    readFile2.pipe(decrypt).pipe(writeFile2);
   })

   readFile2.on("end",()=>{
     fd3.close();
     fd4.close();

   })
   

})();