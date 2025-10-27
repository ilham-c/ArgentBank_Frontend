import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import User from './pages/Profil/Profil.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';


function App() { 
  return ( 
    <>
  <Header/>
  <Routes> 
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/profil" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
    </Routes> 
  <Footer/>
    </>
  )};




  

export default App
