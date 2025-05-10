import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [premium, setPremium] = useState(false);

  const handleLogin = () => {
    login(name, premium);
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <label>
        <input type="checkbox" checked={premium} onChange={(e) => setPremium(e.target.checked)} />
        Premium
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
