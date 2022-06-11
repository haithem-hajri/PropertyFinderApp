import React, { useState, useContext } from "react";
//import "../styles/Navbar.css";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import { API_URL } from "../../env";
import { AiFillCaretDown } from "react-icons/ai";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = () => {
    //logout function with axios
    setIsNavExpanded(false);
    axios
      .post(API_URL + "/auth/logout")
      .then((res) => {
        dispatch({
          type: "LOGGED_OUT",
          payload: { user: null, isLoggedIn: res.data.loggedIn },
        });
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className="navigation">
      <Link to="/" className="brand-name">
        CHERCHI
      </Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <Link to="/ajouter-une-annonce">
              <button>Deposer Votre Annonce</button>
            </Link>
          </li>
          <li onClick={() => setIsNavExpanded(false)} className="navbar-link">
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsNavExpanded(false)} className="navbar-link">
            <Link to="/about">About</Link>
          </li>
          <li onClick={() => setIsNavExpanded(false)} className="navbar-link">
            <Link to="/contact">Contact</Link>
          </li>
          <div className="user-block">
            {state && state.isLoggedIn ? (
              <div className=" logged-in-nav">
                <span className="text-primary cursor-pointer text-lg">
                  {state && state.user && state.user.name}
                </span>
                {/*<img
                  className="w-8 h-8 rounded-full ml-2 object-cover"
                  alt="me"
                  src={
                    state &&state.user&& state.user.hasAvatar===true ?
                       `${API_URL}/user/image/${state &&state.user&& state.user.id &&state.user.id}`
                       :
                       "https://www.w3schools.com/w3images/avatar2.png"
                  }
                />*/}
                <AiFillCaretDown className="text-primary cursor-pointer dropdown mt-1" />
                <div className="dropdown-content">
                  <Link
                    to="/mon-profil"
                    onClick={() => setIsNavExpanded(false)}
                  >
                    {" "}
                    mon profil{" "}
                  </Link>
                  <Link
                    to="/mes-annonces"
                    onClick={() => setIsNavExpanded(false)}
                  >
                    {" "}
                    mes annonces{" "}
                  </Link>
                  <Link to="#" onClick={logout}>
                    {" "}
                    Disconnect{" "}
                  </Link>
                </div>
              </div>
            ) : (
              <li>
                <Link to="/login" onClick={() => setIsNavExpanded(false)}>
                  <button>Se connecter</button>
                </Link>
              </li>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
