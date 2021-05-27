const Header = ({ userId, setUserId, setToken, setScreen }) => {
  const logout = () => {
    setScreen("sm");
    setUserId(null);
    setToken(null);
  };

  return (
    <header className="header">
      <h1 className="site-title">Hide-out of Ocean's 8</h1>
      {userId ? (
        <p>
          <button className="btn link" type="button" onClick={logout}>
            Logout
          </button>
        </p>
      ) : null}
    </header>
  );
};

export default Header;
