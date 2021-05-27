import { api } from "./helpers";

const options = (token) => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

const getUser = ({ userId, token }) => {
  return fetch(`${api}/${userId}`, options(token))
    .then((response) => response.json)
    .then((data) => {
      console.log("data:", data);
    })
    .catch((error) => {
      console.log("error:", error);
      return error.message;
    });
};

const getAllUsers = (token) => {
  return fetch(api, options(token))
    .then((response) => response.json)
    .then((data) => {
      console.log("data:", data);
    })
    .catch((error) => {
      console.log("error:", error);
      return error.message;
    });
};

export { getUser, getAllUsers };
