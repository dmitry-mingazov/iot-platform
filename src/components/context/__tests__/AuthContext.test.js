import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthStateContext } from "../AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";

jest.mock("@auth0/auth0-react");

const renderComponent = (children) => {
  act(() => {
    render(<AuthStateContext>{children}</AuthStateContext>);
  });
};

describe("Auth context", () => {
  test("renders children components inside auth context", () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      getAccessTokenSilently: jest.fn(() => new Promise(() => "tokenfinto")),
    });
    renderComponent(<div>Test Children</div>);
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });
});
