import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom"; 


function Register() {
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
    navigate("/login");

  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h2>Join SmartWaste</h2>
        <p>
          Be part of a cleaner, smarter, and greener future.  
          Whether you’re a <strong>user</strong> or a <strong>collector</strong>,  
          your contribution makes a difference 🌱.
        </p>
      </div>

      <div className="register-right">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register</h2>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="collector">Collector</option>
            </select>
          </div>

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

          <h3 className="section-title">Card Information</h3><br/>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="xxxx xxxx xxxx xxxx"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="card-row">
            <div className="form-group small">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                required
                class="input"
              />
            </div>

            <div className="form-group small">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="***"
                value={formData.cvv}
                onChange={handleChange}
                required
                class="input"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
