import { useEffect, useState } from "react";
import { api } from "../utils/helpers";

import Card from "./Card";
import Message from "./Message";

const Profile = ({ setScreen, userId, token }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(true);

  const showMembers = () => {
    setScreen("lg");
  };

  const getUserInfo = (tokenPassport) => {
    return fetch(`${api}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenPassport,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.type !== "error") {
          setUser(result.user);
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
    if (!user) {
      getUserInfo(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  const makeAPlan = () => {
    return fetch(`${api}/plan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.type !== "error") {
          setError(false);
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <>
      <div className="info">
        {!user ? (
          <p className="btn-wrapper">Loading...</p>
        ) : (
          <Card user={user} />
        )}
      </div>
      <div className="actions">
        <button className="btn primary" type="button" onClick={makeAPlan}>
          Make a Plan
        </button>
        <button className="btn secondary" type="button" onClick={showMembers}>
          Team Members
        </button>
      </div>
      {message && <Message message={message} error={error} />}
    </>
  );
};

export default Profile;
