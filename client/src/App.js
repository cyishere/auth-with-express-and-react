import Footer from "./components/Footer";
import Header from "./components/Header";
// import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="container sm">
          {/* <LoginForm /> */}
          <Profile />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
