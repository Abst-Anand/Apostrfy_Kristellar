
const { hashPassword } = require("./hasher");
console.log(hashPassword);



async function test(){
    const n = await hashPassword("12345",10)
    console.log(n)
  }

  test()