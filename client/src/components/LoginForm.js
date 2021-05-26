import { useState } from "react";
import { login } from "../services/auth";
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

  const doLogin = async (e) => {
    e.preventDefault();
    const result = await login(info);
    console.log("result:", result);
    if (result?.userId) {
      setUserId(result.userId);
      setToken(result.setToken);
    } else {
      setMessage(result);
    }
  };

  return (
    <>
      {message && <Message message={message} error />}

      <form className="form" onSubmit={doLogin}>
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
