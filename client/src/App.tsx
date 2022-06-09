import React, { createContext, useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/about-page/About";
import Contact from "./pages/contact-page/Contact";
import Home from "./pages/home-page/Home";
import Footer from "./components/footer/footer";
import { reducer, initialState } from "./reducers/Reducers";
import Login from "./pages/auth/Login";
import "./App.css";
import SignUp from "./pages/auth/SignUp";
import MyProperties from "./pages/my-properties/MyProperties";
import MyProfile from "./pages/my-profile/MyProfile";
import axios from "axios";
import { API_URL } from "./env";
import AddProperty from "./pages/add-property-page/AddProperty";
import PropertyDetails from "./pages/properties-details/PropertyDetails";
import SearchPage from "./pages/search-page/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
export const UserContext = createContext<any>(null);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/mes-annonces"
        element={
          <ProtectedRoute>
            <MyProperties />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mon-profil"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ajouter-une-annonce"
        element={
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        }
      />

      <Route path={"/property/:id"} element={<PropertyDetails />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //get user axios
      axios
        .get(API_URL + "/getUser", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          dispatch({
            type: "LOGGED_IN",
            payload: { user: res.data.payload, isLoggedIn: res.data.loggedIn },
          });
        })
        .catch((err) => {
          dispatch({
            type: "LOGGED_OUT",
            payload: { user: null, isLoggedIn: false },
          });
          localStorage.clear();
        });
    } else {
      dispatch({
        type: "LOGGED_OUT",
        payload: { user: null, isLoggedIn: false },
      });
      localStorage.clear();
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div className="pb-12">
          <Navbar />
        </div>
        <Routing />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
