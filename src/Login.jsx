// Login.js
import React, { useContext } from "react";
import { ProductContext } from "./context/ProductContext";

const Login = () => {
  const { state, dispatch } = useContext(ProductContext);

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    localStorage.setItem("loggedIn", "false"); // Update the login status in local storage
  };

  const handleLogin = () => {
    dispatch({ type: "LOG_IN" });
    localStorage.setItem("loggedIn", "true"); // Update the login status in local storage
  };

  return (
    <div>
      <h2>Login</h2>
      {state.loggedIn ? (
        <div>
          <p>
            You are logged in. You can now oversee your profiles and access
            order history.
          </p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in. Click the button to simulate logging in.</p>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default Login;
