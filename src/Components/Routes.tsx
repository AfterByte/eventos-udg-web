import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// Helpers imports
import { AuthContext } from './AuthProvider';
import EventosudgApiClient from '../helpers/apiClient';
// Views imports
import LoginView from '../Views/LoginView';

const AuthNavigator = () => {
  return (
    <Switch>
      <Route path='/signin' component={LoginView} />
    </Switch>
  );
}

// Add all app routes here!
const AppNavigator = () => {
  return (
    <Switch>
      {/* TODO: Define component for the /events route */}
      <Route path='/events' component={} />
    </Switch>
  );
}

type RoutesState = {
  isLoading: boolean;
  isSignout: boolean;
  tokenAvailable: boolean;
};

const Routes = () => {
  const apiClient: EventosudgApiClient = useContext(AuthContext) as EventosudgApiClient;

  function reducer(prevState: RoutesState | any, action: { type: string, token: boolean } | any) {
    switch (action.type) {
      case 'restoreToken':
        return {
          ...prevState,
          tokenAvailable: action.token,
          isLoading: false,
        }
      case 'signIn':
        return {
          ...prevState,
          isSignout: false,
          tokenAvailable: action.token,
        }
      case 'signOut':
        return {
        ...prevState,
        isSignout: true,
        tokenAvailable: false,
       }
    } 
  }

  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    tokenAvailable: false,
  });

  // apiClient.
  return (
    <Router>
      {state.tokenAvailable ? <AppNavigator /> : <AuthNavigator />}
    </Router>
  )
}

export default Routes;
