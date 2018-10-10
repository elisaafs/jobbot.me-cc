import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Route } from "react-router-dom";

const elem = (
  <BrowserRouter>
    <Route exact path="/posts" component={App} />
  </BrowserRouter>
);

const mainElement = document.querySelector("main");

ReactDOM.render(elem, mainElement);
