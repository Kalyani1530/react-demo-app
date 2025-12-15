import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

// Mock the apiGateway module
import * as apiGateway from "../../services/apiGateway";

describe("UserList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders users fetched from API", async () => {
    // Mock getRequest to return sample data
    jest
      .spyOn(apiGateway, "getRequest")
      .mockResolvedValue([{ id: 1, name: "John Doe", email: "john@test.com" }]);

    render(<UserList />);

    // Loading state should be visible immediately
    expect(screen.getByText("Loading users...")).toBeInTheDocument();

    const user = await screen.findByText("John Doe – john@test.com");
    expect(user).toBeInTheDocument();
  });

  test("renders error message when API fails", async () => {
    jest
      .spyOn(apiGateway, "getRequest")
      .mockRejectedValue(new Error("API Error"));

    render(<UserList />);

    const errorMsg = await screen.findByText("Unable to load users");
    expect(errorMsg).toBeInTheDocument();
  });
});
