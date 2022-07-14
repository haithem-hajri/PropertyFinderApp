import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Test from "./Test";
import About from "./About";
function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>this is for ADMIN</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          ADMIN DASHBOARD
        </a>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="test">
            <button style={{ color: "red", backgroundColor: "green" }}>
              Test
            </button>
          </Link>
          <Link to="about">
            <button style={{ color: "red", backgroundColor: "green" }}>
              About
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Main />} />
        <Route path="/admin/test" element={<Test />} />
        <Route path="/admin/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
