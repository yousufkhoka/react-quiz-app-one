import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";
import Layout from "./Layout";
import Nav from "./Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />

            <Route
              path="/Quiz/:id"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/Result/:id"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
