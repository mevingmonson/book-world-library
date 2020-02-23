import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NewBook from "./components/NewBook";
import SearchBook from "./components/SearchBook";
import SignUp from "./components/UserSignUp";
import SignIn from "./components/UserSignIn";
import Profile from "./components/Profile";
import Home from "./components/Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/new-book">
            <NewBook />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/search-book">
            <SearchBook />
          </Route>

          {/* if you put this on top use exact in React Route */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
