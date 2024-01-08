import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import http from '../http'; 
import { useAuth } from '../Auth';

const SignIn = () => {
  const {login} = useAuth();  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post('/api/users/login', {
        username: formData.username,
        password: formData.password
      });
      login(response.data.token);
      toast.success('Login successful');
      if (response.data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Login failed');
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-3">Sign In</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <p className="mt-3 alert alert-primary">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
