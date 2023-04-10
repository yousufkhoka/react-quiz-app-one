import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles/Account.module.css";
import { useAuth } from "../Context/AuthContext";

const Account = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            {" "}
            logout{" "}
          </span>
        </>
      ) : (
        <>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Account;
