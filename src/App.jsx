import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Container } from "react-bootstrap";
import CountriesList from "./component/CountriesList";

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <h1 className="mt-4">Countries</h1>
        <CountriesList />
      </Container>
    </Provider>
  );
};

export default App;
