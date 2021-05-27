import { useEffect, useState } from "react";
import { getUser } from "../utils/user";

import Card from "./Card";
import Message from "./Message";

const Profile = ({ setScreen, userId, token }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const showMembers = () => {
    setScreen("lg");
  };

  const getUserInfo = async () => {
    const result = await getUser({ userId, token });
    if (result?.name) {
      setUser(result);
    } else {
      setMessage(result);
    }
  };

  useEffect(() => {
    if (!user) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <button className="btn primary" type="button">
          Make a Plan
        </button>
        <button className="btn secondary" type="button" onClick={showMembers}>
          Team Members
        </button>
      </div>
      {message && <Message message={message} error />}
    </>
  );
};

export default Profile;
