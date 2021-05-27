import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Members from "./components/Members";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

function App() {
  const [screen, setScreen] = useState("sm");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <>
      <div className="wrapper">
        <Header userId={userId} />

        <main className={`container ${screen}`}>
          {screen === "sm" ? (
            <>
              {userId ? (
                <Profile setScreen={setScreen} userId={userId} token={token} />
              ) : (
                <LoginForm setUserId={setUserId} setToken={setToken} />
              )}
            </>
          ) : (
            <Members />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
