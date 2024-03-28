//moved code to index.js for simplicity
import { API } from "./api";

export const sendRequest = async (formData, path) => {
  console.log(`Request at path: ${path}`)
  console.log("formData main sign up: ", formData);
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
