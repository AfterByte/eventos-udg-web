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
import LoginView from "../Views/LoginView";
import UpcomingEvents from "../Views/UpcomingEvents";
import SampleView from "../Views/SampleView";
import ViewTickets from "../Views/ViewTickets";
import LocationMenu from "../Views/LocationMenu";
import LocationDetails from "../Views/LocationDetails";
import LocationCreate from "../Views/LocationCreate";
import LocationEdit from "../Views/LocationEdit";
import CampusesMenu from "../Views/CampusesMenu";
import CreateEventView from "../Views/CreateEventView";
import ViewItems from '../Views/ViewItems';
import CreateEventForm from "../Views/CreateEvent";
import CreateEventLocation from "../Views/CreateEventView";
// Mock data
import { Event } from "./EventCard";
import { events, campuses } from "../helpers/mockData";

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
        <Redirect exact from="/signin" to="/" />
        <Redirect exact from="/" to="/events" />
        <Route path="/events">
          <UpcomingEvents events={events as Event[]} />
        </Route>
        <Route path="/samplemaps" component={SampleView} />
        <Route exact path="/locations" component={LocationMenu} />
        <Route exact path="/locations/new" component={LocationCreate} />
        <Route exact path="/locations/:id" component={LocationDetails} />
        <Route exact path="/locations/:id/edit" component={LocationEdit} />
        <Route path="/myTickets" component={ViewTickets} />
        <Route path="/createEvent" component={CreateEventLocation} />
        <Route path="/campuses">
          <CampusesMenu campuses={campuses} />
        </Route>
        <Route path="/createEventForm" component={CreateEventForm}></Route>
        <Route path="/items" component={ViewItems}/>
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
