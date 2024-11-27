const fs = require("node:fs/promises");



async function Filewatch(){
  const watcher = fs.watch("./text.txt");

  for await(const events of watcher){
    console.log(events);
  }
}

Filewatch();