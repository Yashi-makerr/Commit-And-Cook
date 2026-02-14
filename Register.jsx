import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-card">

        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Join FlavouRx today
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              required
              placeholder=" "
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <label>Name</label>
          </div>

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
            Register
          </button>

        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}
