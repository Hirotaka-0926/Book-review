import { render, screen } from "@testing-library/react";
import LogIn from "../../src/pages/LogIn";
import "@testing-library/jest-dom";
import { store } from "../../src/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

test("ログイン画面が存在する", () => {
  render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
  screen.debug();
  const email = screen.getByLabelText("email");
  const password = screen.getByLabelText("password");
  const button = screen.getByRole("login");

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
