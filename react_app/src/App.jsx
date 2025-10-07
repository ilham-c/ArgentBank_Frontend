import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import User from './pages/User/User.jsx'
import './App.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() { 
  return ( 
    <>
  <Header/>
  <Routes> 
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/user" element={<User />} />
    </Routes> 
  <Footer/>
    </>
  )};




  

export default App
