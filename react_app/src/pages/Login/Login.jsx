// Permet d'envoyer une action Redux (loginUser)
import { useDispatch, useSelector } from 'react-redux';

// Permet de créer des états locaux (email et mot de passe)
import { useState, useEffect } from 'react';

// Import du thunk loginUser depuis le slice d’authentification
import { loginUser } from '../../redux/authentification/authSlice';

// Pour rediriger l'utilisateur après la connexion
import { useNavigate } from 'react-router-dom';

import './Login.css';

export default function Login() {
  // Initialisation du dispatch pour envoyer des actions Redux
  const dispatch = useDispatch();

  // On lit le state global Redux pour connaître l’état de l’authentification
  const { isLoading, error, token } = useSelector((state) => state.auth);

  // useNavigate permet de rediriger vers une autre page
  const navigate = useNavigate();

  // État local pour stocker l’email saisi par l’utilisateur
  const [email, setEmail] = useState('');

  // État local pour stocker le mot de passe saisi
  const [password, setPassword] = useState('');

  // Quand le formulaire est soumis
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    dispatch(loginUser({ email, password })); // Envoie l’action pour se connecter
  };

  // Si le token est défini (connexion réussie), on redirige vers /user
  useEffect(() => {
    if (token) {
      navigate('/user');
    }
  }, [token, navigate]);

  // Formulaire de connexion
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
