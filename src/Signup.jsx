// src/Signup.js
import React, { useState } from "react";

function Signup({ onSignup }) {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        onSignup();
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <h1>Signup page</h1>
      <label>Email:</label>
      <input
        type="text"
        value={signupData.email}
        onChange={(e) =>
          setSignupData({ ...signupData, email: e.target.value })
        }
      />
      <label>Password:</label>
      <input
        type="password"
        value={signupData.password}
        onChange={(e) =>
          setSignupData({ ...signupData, password: e.target.value })
        }
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
