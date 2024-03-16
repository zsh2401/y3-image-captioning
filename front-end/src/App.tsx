import { Router } from "./Router"
import { AppLayout } from "./layouts/AppLayout"
import { EventProvider } from 'sz-react-support'

import "./App.css"

function App() {
  return <EventProvider>
    <AppLayout>
      <Router />
    </AppLayout>
  </EventProvider>
}

export default App
