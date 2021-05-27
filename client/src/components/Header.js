const Header = ({ userId }) => (
  <header className="header">
    <h1 className="site-title">Hide-out of Ocean's 8</h1>
    {userId ? (
      <p>
        <button className="btn link">Logout</button>
      </p>
    ) : null}
  </header>
);

export default Header;
