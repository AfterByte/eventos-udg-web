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
import ViewTickets from "../Views/ViewTickets";
import LocationMenu from "../Views/LocationMenu";
import LocationDetails from "../Views/LocationDetails";
import LocationCreate from "../Views/LocationCreate";
import LocationEdit from "../Views/LocationEdit";
import CampusesMenu from "../Views/CampusesMenu";
import ViewItems from "../Views/ViewItems";
import CreateEventForm from "../Views/CreateEvent";
import CreateEventLocation from "../Views/CreateEventView";
import UsersView from "../Views/UsersView"
import EventDetails from "../Views/EventDetailView"
import SampleView from "../Views/SampleView";

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
        <Route exact path="/events" component={UpcomingEvents}/>
        <Route exact path="/events/:id" component={EventDetails}/>
        <Route path="/samplemaps" component={SampleView} />
        <Route exact path="/events" component={UpcomingEvents} />
        <Route exact path="/events/new" component={CreateEventLocation} />
        <Route exact path="/locations" component={LocationMenu} />
        <Route exact path="/locations/new" component={LocationCreate} />
        <Route exact path="/locations/:id" component={LocationDetails} />
        <Route exact path="/locations/:id/edit" component={LocationEdit} />
        <Route path="/myTickets" component={ViewTickets} />
        <Route path="/createEvent" component={CreateEventLocation} />
        <Route path="/createEventForm" component={CreateEventForm}></Route>
        <Route path="/users" component={UsersView}></Route>
        <Route path="/campuses" component={CampusesMenu} />
        <Route path="/createEventForm" component={CreateEventForm} />
        <Route path="/items" component={ViewItems} />
        <Route path="/sample" component={SampleView} />
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
