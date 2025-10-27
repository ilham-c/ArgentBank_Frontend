import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { loginUser } from '../../redux/authentification/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, error, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    dispatch(loginUser({ email, password })); // Envoie l’action pour se connecter
  };

  // Si le token est défini (connexion réussie), on redirige vers /user
  useEffect(() => {
    if (token) {
      navigate('/profil');
    }
  }, [token, navigate]);

 
  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className="fa fa-user-circle sign-in-icon"></i>
        
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={email} // L’input est relié à l’état email
              onChange={(e) => setEmail(e.target.value)} // Mise à jour à chaque frappe
              required 
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Bouton de soumission, désactivé si la requête est en cours */}
          <button className="sign-in-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Affiche une erreur en rouge si elle existe */}
          {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

          {/* Affiche un message de succès si le token existe */}
          {token && <p style={{ color: 'green' }}>Connexion réussie !</p>}
        </form>
      </section>
    </main>
  );
}
