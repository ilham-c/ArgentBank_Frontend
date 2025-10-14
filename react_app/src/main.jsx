import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import store from './redux/authentification/store.js'  // adapte le chemin si besoin
import { Provider } from 'react-redux'            // <-- Import Provider ici

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>            {/* <-- On ajoute Provider ici */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
      </Provider>
  </StrictMode>,
)
