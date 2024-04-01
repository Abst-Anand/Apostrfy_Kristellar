//moved code to index.js for simplicity
import { API } from "./api";

const bcrypt = require('bcryptjs')

import { hashPassword } from "../hash/hasher";

export const sendRequest = async (formData, path) => {
  console.log(`Request at path: ${path}`)
  console.log("Data: ", formData);
  let hashedPswrd = ''
  if(formData.userPassword){
    pss = formData.userPassword
    hashedPswrd = await bcrypt.hash("pss", 10)
  }
  console.log("pss",pss)
  console.log("Hashedpss",hashedPswrd)
  try {
    const url = API + path;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response;
  } catch (error) {
    // Network error or other unexpected errors
    console.error("Error:", error);
  }
};

// export const get = async (formData, path) => {
//   try {
//     const url = API + path
//     console.log("FINAL URL:",url)
//     const response = await fetch(url,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)})
//     return response
//   } catch (error) {
//     console.log("Error Occured:",error)
//   }
// };
