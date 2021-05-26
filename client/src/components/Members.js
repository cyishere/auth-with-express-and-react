import Card from "./Card";

const Members = () => {
  return (
    <>
      <p className="btn-wrapper">
        <button type="button" className="btn link">
          Your Profile
        </button>
      </p>
      <div className="grid">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Members;
