"use client";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      document.cookie = "admin-auth=true; path=/";
      window.location.href = "/admin";
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
