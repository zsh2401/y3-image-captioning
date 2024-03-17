import { Router } from "./Router"
import { EventProvider } from 'sz-react-support'

import "./App.css"

function App() {
  return <EventProvider>
   
      <Router />
  </EventProvider>
}

export default App
