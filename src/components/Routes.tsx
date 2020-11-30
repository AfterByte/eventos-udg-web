import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// Helpers imports
import { AuthContext, AuthProviderPayload } from "./AuthProvider";
// Views imports
import LoginView from "../views/LoginView";
import UpcomingEvents from "../views/events/UpcomingEvents";
import {
  IndexLocations,
  ShowLocation,
  CreateLocation,
  EditLocation,
} from "../views/locations";
import Campuses from "../views/Campuses";
import Items from "../views/Items";
import CreateEventForm from "../views/CreateEvent";
import SampleView from "../views/SampleView";
import Users from "../views/Users";
import IndexEvents from "../views/events/IndexEvents";
import ShowEvent from "../views/events/ShowEvent";
import Tickets from "../views/Tickets";
import CreateEvent from "../views/events/CreateEvent";
import UpdateEvent from "../views/events/UpdateEvent";

const AuthNavigator = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/signin" />
      <Route path="/signin" component={LoginView} />
    </Switch>
  );
};

// Add all app routes here!
export const ResponsiveContext = createContext({});
export type RespContextPayload = {
  toggleSidebar(): void;
  sidebarHidden: boolean;
};
const AppNavigator = () => {
  return (
    <Switch>
      <Redirect exact from="/signin" to="/" />
      <Redirect exact from="/" to="/upcoming" />
      <Route exact path="/upcoming" component={UpcomingEvents} />
      <Route exact path="/events" component={IndexEvents} />
      <Route exact path="/events/owned">
        <IndexEvents fetchOwned={true} />
      </Route>
      <Route exact path="/events/new" component={CreateEvent} />
      <Route exact path="/events/:id" component={ShowEvent} />
      <Route exact path="/events/:id/edit" component={UpdateEvent} />
      <Route exact path="/locations" component={IndexLocations} />
      <Route exact path="/locations/new" component={CreateLocation} />
      <Route exact path="/locations/:id" component={ShowLocation} />
      <Route exact path="/locations/:id/edit" component={EditLocation} />
      <Route path="/tickets" component={Tickets} />
      <Route path="/campuses" component={Campuses} />
      <Route path="/createEventForm" component={CreateEventForm} />
      <Route path="/items" component={Items} />
      <Route path="/users" component={Users} />
      <Route path="/sample" component={SampleView} />
    </Switch>
  );
};

const Routes = () => {
  const [sidebarHidden, setSidebarHidden] = useState(true);

  const payload: RespContextPayload = {
    toggleSidebar: () => {
      return setSidebarHidden(!sidebarHidden);
    },
    sidebarHidden: sidebarHidden,
  };
  const { apiClient } = useContext(AuthContext) as AuthProviderPayload;
  return (
    <ResponsiveContext.Provider value={payload}>
      <Router>
        {apiClient.tokenLoaded ? <AppNavigator /> : <AuthNavigator />}
      </Router>
    </ResponsiveContext.Provider>
  );
};

export default Routes;
