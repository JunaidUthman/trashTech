import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; 

function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "user",
    username: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Registration submitted successfully!");
    localStorage.setItem('token', 'token');
    navigate('/home');
    window.location.reload();

  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h2>WELCOME BACK!</h2>
        <p>
          Be part of a cleaner, smarter, and greener future.  
          Whether you’re a <strong>user</strong> or a <strong>collector</strong>,  
          your contribution makes a difference 🌱.
        </p>
      </div>

      <div className="register-right">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>LogIn</h2>

          <div className="form-group">
            <label>Username (optional)</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
