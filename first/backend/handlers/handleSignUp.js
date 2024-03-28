//moved code to index.js for simplicity
<<<<<<< HEAD
const prefURL = "http://192.168.1.112:3002";
=======
const prefURL = "http://192.168.1.117:3002";
>>>>>>> c29c1fe6024bad9f1d453fe7a7b6291230a5625d



export const signUpMain = async (formData, path) => {
  console.log("formData main sign up: ", formData);
  try {
    const url = prefURL + path;
    console.log("FINAL URL:",url)
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

export const signInMain = async (formData, path) => {
  try {
    const url = prefURL + path
    console.log("FINAL URL:",url)
    const response = await fetch(url,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)})
    return response
  } catch (error) {
    console.log("Error Occured:",error)
  }
};
