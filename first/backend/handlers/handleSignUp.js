//moved code to index.js for simplicity
const prefURL = "http://192.168.0.111:3002";



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
    const response = await fetch(url,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)})
    return response
  } catch (error) {
    console.log("Error Occured:",error)
  }
};
