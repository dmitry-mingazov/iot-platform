import React from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Device from "../Device";
import "@testing-library/jest-dom/extend-expect";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Device />
    </BrowserRouter>
  );
};

describe("Device component", () => {
  test("renders Device component", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
    expect(screen.getByText("View information")).toBeInTheDocument();
  });

  test("opens menu correctly when clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("menuitem").length).toBe(2);
  }); 
});
