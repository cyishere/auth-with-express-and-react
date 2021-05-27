import { useEffect, useState } from "react";
import { api } from "../utils/helpers";
import Card from "./Card";
import Message from "./Message";

const Members = ({ token, setScreen }) => {
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState(null);

  const getUsers = (tokenPassport) => {
    return fetch(`${api}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenPassport,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.type !== "error") {
          setUsers(result.users);
          setMessage(null);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  useEffect(() => {
    if (!users) {
      getUsers(token);
    }
  }, [users, token]);

  const backToProfile = () => {
    setScreen("sm");
  };

  return (
    <>
      <p className="btn-wrapper">
        <button type="button" className="btn link" onClick={backToProfile}>
          Your Profile
        </button>
      </p>

      {message && <Message message={message} error />}

      {users ? (
        <div className="grid">
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="btn-wrapper">Loading...</p>
      )}
    </>
  );
};

export default Members;
