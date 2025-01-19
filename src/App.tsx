import React from "react";
import "./App.css";
import Router from "./Routes/Router";
import { store } from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </Provider>
    </div>
  );
}

export default App;
