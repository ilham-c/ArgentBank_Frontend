import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserName } from '../../redux/authentification/authSlice';
import './User.css';
import Account from '../../components/Account/Account';



export default function User() {

const dispatch = useDispatch();
const [isEditing, setIsEditing] = useState(false);

  // 🔁 On récupère les infos utilisateur depuis le store Redux
  const { user, token } = useSelector((state) => state.auth);


  // 🔁 États locaux pour gérer l’édition du pseudo
  const [newUserName, setNewUserName] = useState('');

  // 🔁 Récupérer le profil à l’arrivée sur la page
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token]);

   const handleSave = () => {
    if (newUserName.trim() !== '') {
      dispatch(updateUserName(newUserName))
        .then(() => {
          // Une fois le username mis à jour, on recharge tout le profil complet
          dispatch(getUserProfile());
        });
      setIsEditing(false);
    }
  };

if  (!user || Object.keys(user).length === 0) {
  return <p>Chargement des données utilisateur...</p>;
}

  const accounts = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '2,082.79',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '10,928.42',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '184.30',
      description: 'Current Balance',
    },
  ];

 return (
  <main className="main bg-dark">
    <div>
  {isEditing ? (
    <div key="edit" className="edit-form">
      <h1>Edit user info</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Empêche le rechargement de la page au submit
          handleSave();
        }}
      >
        {/* 🔁 Username modifiable */}
        <div className="input-wrapper">
          <label htmlFor="username">User name:</label>
          <input
            id="username"
            type="text"
            value={newUserName || ''}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>

        {/* 🔁 Prénom en lecture seule */}
        <div className="input-wrapper">
          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            type="text"
            value={user.firstName || ''}
            disabled
          />
        </div>

        {/* 🔁 Nom en lecture seule */}
        <div className="input-wrapper">
          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            type="text"
            value={user.lastName || ''}
            disabled
          />
        </div>

        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div key="view" className="header">
      <h1>
        Welcome back<br />
        {user.firstName} {user.lastName}!
      </h1>
      <button
        className="edit-button"
        onClick={() => {
          setNewUserName(user.userName); // 👈 on pré-remplit le champ
          setIsEditing(true);
        }}
      >
        Edit Name
      </button>
    </div>
  )}
</div>

  <h2 className="sr-only">Accounts</h2>

  {accounts.map((account, index) => (
    <Account
      key={index}
      title={account.title}
      amount={account.amount}
      description={account.description}
    />
  ))}
</main>

)};
