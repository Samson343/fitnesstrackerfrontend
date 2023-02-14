import {} from "./components"
import { useEffect } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  
  return (
    <Router>
      <div className="App">

        <Route path = "/login">
          
        </Route>

        <Route path = "/register">
          
        </Route>

        <Route exact path = "/">
          
        </Route>

        <Route path = '/routines'>

        </Route>

        <Route path = "/createRoutine">

        </Route>

        <Footer />

      </div>
    </Router>
  );
}

export default App;