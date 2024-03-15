import { useState } from 'react'
import { Router } from "./Router"
import './App.css'
import { EventProvider } from 'sz-react-support'

function App() {
  return <EventProvider>
    <Router />
  </EventProvider>
}

export default App
