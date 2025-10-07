import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Logo from '../../assets/argentBankLogo.webp';


function Header() {
    return (
    <nav className='main-nav'>
        <Link to="/" className='main-nav-logo'>
        <img className='main-nav-logo-image' src={Logo} alt='Logo Argent Bank'/>
        </Link>
        <div className='login'>
            <Link to= "/" className='main-nav-item'>
            <i className='fa fa-user-circle'></i>
            <span className='login-text'>Se connecter</span>
            </Link>
        </div>
    </nav>
    )
}

export default Header;