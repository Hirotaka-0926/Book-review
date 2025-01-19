import React from "react";
import Router from "./Routes/Router";
import { store } from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    </div>
  );
}

export default App;
