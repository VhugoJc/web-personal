import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './config/Routes';//Arreglo que recibe los datos de rutas
import AuthProvider from './providers/AuthProvider';
import './index.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}
 
function RouteWithSubRoutes(route) {
  
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}


export default App;
