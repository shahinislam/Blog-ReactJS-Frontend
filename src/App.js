import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Create from './Blogs/Create';
import Index from './Blogs/Index';
import Show from './Blogs/Show';
import Edit from './Blogs/Edit';
import Protected from './Protected';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/blogs/create">
              <Protected Component={Create} />
              {/* <Create /> */}
            </Route>
            <Route path="/blogs/:id/edit">
              <Protected Component={Edit} />
            </Route>
            <Route path="/blogs/:id">
              <Protected Component={Show} />
              {/* <Show /> */}
            </Route>
            <Route path="/blogs">
              <Protected Component={Index} />
              {/* <Index /> */}
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;

