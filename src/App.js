import {Route, Switch } from 'react-router-dom'
import FirstPage from './code/login.js';


export default function App() {

  return (
    <Route>
      <div className='App'>
        <Switch>
          <Route path='/:recordId' render={(props) => <FirstPage {...props} />} exact component={FirstPage} />
        </Switch>
      </div>
    </Route>
  )


}