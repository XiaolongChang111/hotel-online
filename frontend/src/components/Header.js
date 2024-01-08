import React from 'react';
import { useAuth } from '../Auth'; 
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { user, authed, logout } = useAuth();
  const navigate = useNavigate();
  const handleClickLogout = () => {
    logout();
    navigate('/login');
  }
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">BookMyStay</NavLink>
        <div className="collapse navbar-collapse ms-auto">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!authed ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            ) : (
              <>
                {user && !user.isAdmin && (
                  <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customer/orders">Orders</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customer">Rooms</NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="nav-link btn btn-link" 
                  onClick={handleClickLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
