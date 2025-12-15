import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import { getRequest } from "../../services/apiGateway";

jest.mock("../../services/apiGateway");

describe("UserList", () => {
  test("shows users on success", async () => {
    getRequest.mockResolvedValue([
      { id: 1, name: "John Doe", email: "john@test.com" },
    ]);

    render(<UserList />);

    expect(await screen.findByText(/John Doe/)).toBeInTheDocument();
  });

  test("shows error on failure", async () => {
    getRequest.mockRejectedValue(new Error("API error"));

    render(<UserList />);

    expect(
      await screen.findByText(/unable to load users/i)
    ).toBeInTheDocument();
  });
});
