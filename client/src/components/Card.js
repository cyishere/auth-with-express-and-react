import React from "react";

const Card = ({ user }) => {
  return (
    <div className="card">
      <h2 className="name">{user.name}</h2>
      <p className="job">{user.job}</p>
      <img
        src={`/avatars/${user.id}.jpeg`}
        alt={user.name}
        className="avatar"
      />
    </div>
  );
};

export default Card;
