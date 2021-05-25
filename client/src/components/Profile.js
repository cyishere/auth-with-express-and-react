import Card from "./Card";

const Profile = () => {
  return (
    <>
      <div className="info">
        <Card />
      </div>
      <div className="actions">
        <button className="btn primary" type="button">
          Make a Plan
        </button>
        <button className="btn secondary" type="button">
          Team Members
        </button>
      </div>
    </>
  );
};

export default Profile;
