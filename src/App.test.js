import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/UserList/UserList", () => () => (
  <div>UserList Component</div>
));

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText(/UserList Component/i)).toBeInTheDocument();
  });
});
