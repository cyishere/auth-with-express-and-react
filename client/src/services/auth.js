import { api } from "./helper";

export const login = (userInfo) => {
  return fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.type === "error") {
        return data.message;
      }

      return data;
    })
    .catch((error) => {
      console.log("error:", error);
      return error.message;
    });
};
