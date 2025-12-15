import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders users fetched from API", async () => {
  global.fetch = () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([{ id: 1, name: "John Doe", email: "john@test.com" }]),
    });

  render(<App />);

  expect(screen.getByText(/loading users/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("John Doe - john@test.com")).toBeInTheDocument();
  });
});
