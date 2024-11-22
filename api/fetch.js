// import fetch from "node-fetch";

const httpCall = async ({ url, method = "POST", data = {} }) => {
  try {
    const options = {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    if (["POST", "PUT", "PATCH", "UPDATE"].includes(method)) {
      options.body = data;
    }
    // console.log(options);
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error("Error in httpCall:", error);
    throw error;
  }
};
export default httpCall;
