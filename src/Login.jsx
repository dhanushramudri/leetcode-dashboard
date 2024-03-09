import React, { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success. Token:", data.token);
        console.log("User ID:", data.userId); // Log the user ID

        // Pass both the token and user ID to the onLogin callback
        onLogin(data.token, data.userId);
      } else {
        console.error("Login failed. Response:", response);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h1>Login page</h1>
      <label>Email:</label>
      <input
        type="text"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <label>Password:</label>
      <input
        type="password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
