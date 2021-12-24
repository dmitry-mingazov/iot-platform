import React from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Layout from "../Layout";
import "@testing-library/jest-dom/extend-expect";
import { SnackbarStateContext } from "../context/SnackbarContext";
import { act } from "react-dom/test-utils";

jest.mock("../../components/context/NodeRedContext", () => (
  {
    useNodeRed: () => ({
      isNodeRedLoading: true
    })
  }
  )
);

const renderComponent = () => {
  act(() => {
    render(
      <BrowserRouter>
        <SnackbarStateContext>
          <Layout />
        </SnackbarStateContext>
      </BrowserRouter>
    );
  });
};

describe("Layout component", () => {
  test("renders Layout component", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: "open drawer" })
    ).toBeInTheDocument();
  });

  test("opens and closes drawer correctly", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "open drawer" }));
    expect(screen.queryByRole("button", { name: "open drawer" })).toBeNull();
    expect(screen.getByRole("button", { name: "Devices" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(
      screen.getByRole("button", { name: "open drawer" })
    ).toBeInTheDocument();
  });
});
