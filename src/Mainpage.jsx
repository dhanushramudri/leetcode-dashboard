import React from "react";
import Problems from "./Problems";

function MainPage({ token, userId }) {
  console.log("Token in MainPage:", token);
  console.log("UserId in Mainpage:", userId);
  return (
    <div>
      <h1>Main Page</h1>
      <Problems token={token} userId={userId} />
    </div>
  );
}

export default MainPage;
