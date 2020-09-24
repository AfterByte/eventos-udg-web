import React, { useContext, createContext, useState } from "react";
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
import SampleView from "../Views/SampleView";
//import LocationView from "../Views/LocationView";
import LocationMenu from "../Views/LocationMenu"
import LocationDetails from "../Views/LocationDetails"
import LocationView from "../Views/LocationView";
import LocationEdit from "../Views/LocationEdit";
import CampusesMenu from "../Views/CampusesMenu";
// Mock data
import { Event } from "./EventCard";
import { events, locations, campuses } from "../helpers/mockData";

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
export const ResponsiveContext = createContext({});
export type RespContextPayload = {
  toggleSidebar(): void;
  sidebarHidden: boolean;
};
const AppNavigator = () => {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const payload: RespContextPayload = {
    toggleSidebar: () => {
      return setSidebarHidden(!sidebarHidden);
    },
    sidebarHidden: sidebarHidden,
  };

  return (
    <ResponsiveContext.Provider value={payload}>
      <Switch>
        {/* TODO: Define component for the /events route */}
        <Redirect exact from="/signin" to="/" />
        <Redirect exact from="/" to="/events" />
        <Route path="/events">
          <UpcomingEvents events={events as Event[]} />
        </Route>
        {/*<Route path="/location">
          <LocationView />
        </Route>*/}
        <Route path="/samplemaps" component={SampleView} />
        <Route path="/locations"><LocationMenu locations={locations}/></Route>
        <Route exact path="/locationDetails/:id"><LocationDetails/></Route>
        <Route path="/createLocation"><LocationView/></Route>
        <Route exact path="/editLocation/:id"><LocationEdit/></Route>
        <Route path="/campuses"><CampusesMenu campuses={campuses}/></Route>
      </Switch>
    </ResponsiveContext.Provider>
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
