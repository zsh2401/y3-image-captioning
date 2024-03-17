import { Router } from "./Router"
import { EventProvider, DarkModeProvider } from 'sz-react-support'

import "./App.css"

function App() {
  return <EventProvider>
    <DarkModeProvider>
      <Router />
    </DarkModeProvider>
  </EventProvider>
}

export default App
