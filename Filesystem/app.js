const { log } = require("node:console");
const fs = require("node:fs/promises");



(async()=>{
  const watcher = fs.watch("./text.txt");
  const fd=  await fs.open("./text.txt");
   
   const createFile  = async function(filepatth){
      try{
        const ff = await fs.writeFile(filepatth,"ok");
        console.log("file created")
      }catch(err){
        console.log("Given path is invalid please check it again");
      }
      
   }

   const renamefile = async function(oldfilepath,newfilepath){
      console.log(oldfilepath);
      console.log(newfilepath);
      
      
       const renamed = await fs.rename(oldfilepath.trim(),newfilepath.trim()); //trim remove all spaces its important to pass in exact thing
       (renamed === undefined) ? console.log("Succefully renamed") : console.log("Error check the path and name of file is correct");
      
   }

   const deleteFile = async function (filepath) {
    try{  

    const check = await fs.access(filepath);
    if(check === undefined){ 
      const deleted = await fs.unlink(filepath);
      ( deleted === undefined) ? console.log("Succefully delete the file") : console.log("Error check the path and name of file is correct");
    }
   }catch(err){
  
      console.log("create file before delteing");
   
 
   
}}
   const appendFile = async function (filepath,data) {
    try{
    const check = await fs.access(filepath);
    if(check === undefined){ 
      const appended = await fs.appendFile(filepath,data);
      (appended === undefined) ? console.log("Succefully appended data") : console.log("Error check the path and name of file is correct");

    }
  }catch(err){
    if(err){
      console.log("create file before appending");
   }



  }
     
      
      
   }

   fd.on("change",async ()=>{
    const command1 = "create a file";
    const command2 = "rename a file"
    const command3 = "delete a file"
    const command4 = "append to file"
    const stat = (await fd.stat());
    const size = stat.size;
    
    const buffer = Buffer.alloc(size);
    const offset = 0;
    const len = buffer.byteLength;
    position = 0;

    const content = await fd.read(buffer , offset, len,position);

    const data = content.buffer.toString("utf-8");
    if(data.includes(command1)){
       const filepatth = data.substring(command1.length + 1).trim();
       console.log(filepatth);
       
       createFile(filepatth);


    }else if(data.includes(command2) && data.includes("to")){
       const index = data.indexOf("to");
       const oldfilepath = data.substring(command2.length+1,index);  
       const newfilepath = data.substring(index+3,data.length);  
       renamefile(oldfilepath,newfilepath);



    }else if(data.includes(command3)){

      const filepath = data.substring(command3.length + 1).trim();
      deleteFile(filepath);

           
    }else if(data.includes(command4)){
      const filepath = data.substring(command4.length + 1).trim();
      
      
      const [path,...datainfile] = filepath.split(" ").map(  (data)=>{ return  data.trim() }   );
    
      appendFile(path,datainfile.join(" "));
      

      
    
     

    }else{
       console.log("Command not found");
       
      
    }


   });

  for await(const events of watcher){
    if(events.eventType === "change"){
        fd.emit("change");

    }

    
   
  }
}

)();