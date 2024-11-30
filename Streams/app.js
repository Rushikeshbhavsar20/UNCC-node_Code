/*const fs = require("node:fs/promises");


 (async () =>{

  const fd = await fs.open("text.txt","w");
  
console.time("writeMany");
  for(let i=0 ; i<100000 ; i++){
    const filew = fd.write(`${i}  `); //this is fast because  the bits are pushed random in buffer not in order result cvan be  9 24 13 312
  }
  console.timeEnd("writeMany");

} ) ();

const fs = require("node:fs");


(async ()=>{
    console.time("writeMany");
     fs.open("text.txt","w",(err,fd)=>{
        for(let i=0 ; i<1000000; i++){
         fs.write(fd,`${i} `,()=>{});
        }
        console.timeEnd("writeMany");
      
      



     });



})();
const fs = require("node:fs"); //writeSync writes in order so take more time than write


(async ()=>{
    console.time("writeMany");
     fs.open("text.txt","w",(err,fd)=>{
        for(let i=0 ; i<1000000; i++){
         fs.writeSync(fd,`${i} `,()=>{});
        }
        console.timeEnd("writeMany");
      
      



     });



})();


//using stream vs using  normal write  Stream is very very fast but memory usage is very very high compare to normal so never use stream
const fs = require("node:fs/promises");

(async () =>{

    const fd = await fs.open("text.txt","w");
    const stream = fd.createWriteStream();
  console.time("writeMany");
    for(let i=0 ; i<100000 ; i++){
        const buffer = Buffer.from(`${i}`,"utf-8");
        stream.write(buffer);
    }
    console.timeEnd("writeMany");
  
  } ) ();

 


 (async () =>{

  const fd = await fs.open("text.txt","w");
  
console.time("writeMany");
  for(let i=0 ; i<100000 ; i++){
    const filew = fd.write(`${i}  `); //this is fast because  the bits are pushed random in buffer not in order result cvan be  9 24 13 312
  }
  console.timeEnd("writeMany");

} ) ();
 */ 
const fs = require("node:fs/promises");

(async ()=>{

   console.time("writeMany");
   
  const fd = await fs.open("./text.txt","w");
  const stream = fd.createWriteStream();
  let i = 0;

  const writeMany = () => {
    while( i < 1000000 ){
      const buff = Buffer.from(`${i}  `,"utf-8");


      if(i === 999999) return stream.end(buff);
    
      
      if(!stream.write(buff))break;
     
       i++;
  }
}


  writeMany();

  stream.on("drain",()=>{
    writeMany();
  });

  stream.on("finish",() => {
    console.timeEnd("writeMany");
    fd.close();
  });




})();


