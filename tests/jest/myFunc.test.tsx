import { render, screen } from "@testing-library/react";
import App from "../../src/App";
import "@testing-library/jest-dom";

test("「Hello Test」が描画されている", () => {
  render(<App />);
  screen.debug();
  const email = screen.getByLabelText("email");
  const password = screen.getByLabelText("password");
  const button = screen.getByRole("login");

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
