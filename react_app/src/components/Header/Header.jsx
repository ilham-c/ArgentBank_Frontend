import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Logo from '../../assets/argentBankLogo.webp';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authentification/authSlice.js';



function Header() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);

    return (
    <nav className='main-nav'>
        <Link to="/" className='main-nav-logo'>
        <img className='main-nav-logo-image' src={Logo} alt='Logo Argent Bank'/>
        </Link>

         <div className='login'>
        {token ? (
          <>
            <Link to="/profil" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              <span className="login-text">{user.userName || user.firstName}</span>
            </Link>
            <button
              className="main-nav-item logout-button"
              onClick={() => dispatch(logout())}

            >
              <i className="fa fa-sign-out"></i>
              Se déconnecter
            </button>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <span className="login-text">Se connecter</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;