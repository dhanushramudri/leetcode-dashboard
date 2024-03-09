import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import MainPage from "./Mainpage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(""); // Add userToken state
  const [userId, setUserId] = useState(""); // Add userId state

  const handleLogin = (token, userId) => {
    setLoggedIn(true);
    setUserToken(token); // Set the token in state
    setUserId(userId); // Set the userId in state
  };
  console.log("app component", userToken, userId);

  const handleSignup = () => {
    // You can add additional logic after signup if needed
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <Login onLogin={handleLogin} />
          <Signup onSignup={handleSignup} />
        </>
      ) : (
        <MainPage
          token={userToken}
          userId={userId}
        /> /* Pass the token and userId to MainPage */
      )}
    </div>
  );
}

export default App;
