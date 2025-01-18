import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <form>
        <label htmlFor="email">email</label>
        <input id="email" type="email" name="email" />
        <br />
        <label htmlFor="password">password</label>
        <input id="password" type="password" name="password" />
        <button type="submit">ログイン</button>
      </form>
    </React.Fragment>
  );
}

export default App;
