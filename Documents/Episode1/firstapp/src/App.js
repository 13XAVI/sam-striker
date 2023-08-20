
import Home from "./components/Home/home";
import Navbar from "./components/navbar/navbar";
import Transactions from "./components/transactions/transactions";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {


  return (
    <Router>
      <div>
        <Navbar/>
          <Switch>
            <Route path='/home'>
              <Home/>
            </Route>
            <Route path='/transactions'>
              <Transactions/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
