import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-card">

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          Login to continue to FlavouRx
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="email"
              required
              placeholder=" "
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              placeholder=" "
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <label>Password</label>
          </div>

          <button className="auth-btn">
            Login
          </button>

        </form>

        <p className="switch-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}
