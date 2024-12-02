const fs = require("node:fs/promises");


const writefunction = async () => {

   const fd = await fs.open("./src.txt","w");
   const stream = fd.createWriteStream();
   let i = 0;
   const writeData = () =>{
 
    while(i < 100000){
        const Buff = Buffer.from(` ${i} `,"utf-8");
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
      
      const arr = (chunk.toString("binary"));
      const arr1 = arr.split("  ");
      const data =  arr1.filter((value)=>{ if(value % 2 === 0 ) return value }).toString();
      const data_to_string = data.replace(/,/g," ").trim();
      const buff = Buffer.from(data_to_string,"utf-8");
     if(! stream2.write(buff) ){
      stream.pause();   
     }
    
     
   })

   stream2.on("drain",()=>{
      stream.resume();
   })

   stream.on("end", () => { stream2.end(); console.log('Finished processing files.'); });

};


(async () =>{
   await writefunction();
   await readFunction();
})();

