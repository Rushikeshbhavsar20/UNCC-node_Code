const {Buffer} = require("node:buffer");
const { log } = require("node:console");




const Mem = Buffer.alloc(5)
Mem[0] = 0b01001000;

Mem[1] = 0b01101001;

Mem[2] = 0b00100001;

Mem[3] = 0x73;
Mem[4] = 
Mem.map((x) => {console.log(x)})
  a = Buffer.from( "1F0CF" , "hex").toString("utf-8")
  console.log(a); 

const b = Mem.toString("utf-8")
console.log(b);
console.log(Buffer.poolSize)