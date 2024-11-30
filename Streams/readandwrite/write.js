const fs = require("node:fs/promises");


const writefunction = async () => {

   const fd = await fs.open("./src.txt","w");
   const stream = fd.createWriteStream();
   let i = 0;
   const writeData = () =>{
 
    while(i < 100000){
        const Buff = Buffer.from(`${i} lets go `,"utf-8");
        if(i == 99999) return stream.end(Buff);
        if(!stream.write(Buff)) break;
        i++;
    }

   }
   writeData()
   stream.on("drain",()=>{
      writeData();
   })


};

const readFunction = async () => {

   const fd = await fs.open("./src.txt","r");
   const fd_w = await fs.open("./dest.txt","w");

   const stream = fd.createReadStream();
   const stream2 = fd_w.createWriteStream();
   
   stream.on("data" , (chunk) =>{
     if(! stream2.write(chunk) ){
      stream.pause();   
     }
    
     
   })

   stream2.on("drain",()=>{
      stream.resume();
   })

};


(async () =>{
   await writefunction();
   await readFunction();
})();

