import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Room from '../Room.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Room />
  </StrictMode>,
)
