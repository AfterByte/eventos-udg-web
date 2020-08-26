import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

// Helpers imports
import { AuthContext, AuthProviderPayload } from "./AuthProvider";
// Views imports
import LoginView from "../Views/LoginView";
import UpcomingEvents from "../Views/UpcomingEvents";
// Mock data
import { events } from "../helpers/mockData";

const AuthNavigator = () => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  return (
    <Switch>
      <Redirect exact from="/" to="/signin" />
      <Route path="/signin" component={LoginView} />
    </Switch>
  );
};

// Add all app routes here!
const AppNavigator = () => {
  return (
    <Switch>
      {/* TODO: Define component for the /events route */}
      <Redirect exact from="/signin" to="/" />
      <Redirect exact from="/" to="/events" />
      <Route path="/events">
        <UpcomingEvents
          userName={"USER"}
          barTitle={"Próximos eventos"}
          events={events}
        />
      </Route>
    </Switch>
  );
};

const Routes = () => {
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  return (
    <Router>
      {apiClient.tokenLoaded ? <AppNavigator /> : <AuthNavigator />}
    </Router>
  );
};

export default Routes;
