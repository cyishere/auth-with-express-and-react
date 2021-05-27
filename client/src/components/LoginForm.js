import { useState } from "react";
import { api } from "../utils/helpers";
import Message from "./Message";

const LoginForm = ({ setUserId, setToken }) => {
  const [info, setInfo] = useState({
    name: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    return fetch(`${api}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result in Login:", result);
        if (result.type !== "error") {
          // login success
          setUserId(result.userId);
          setToken(result.token);
        } else {
          // show error messages
          setMessage(result.message);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        setMessage(error.message);
      });
  };

  return (
    <>
      {message && <Message message={message} error />}

      <form className="form" onSubmit={loginSubmit}>
        <label className="label">Name:</label>
        <input
          type="text"
          name="name"
          className="input"
          value={info.name}
          onChange={handleChange}
        />
        <label className="label">Password:</label>
        <input
          type="password"
          name="password"
          className="input"
          value={info.password}
          onChange={handleChange}
        />
        <button className="btn primary" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
