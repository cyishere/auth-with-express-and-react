import { useState } from "react";

const LoginForm = () => {
  const [info, setInfo] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form">
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
  );
};

export default LoginForm;
