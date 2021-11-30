import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Devices from "../pages/Devices";
import '@testing-library/jest-dom/extend-expect';

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Devices />
    </BrowserRouter>
  );
}

describe("Devices component", () => {
  test("renders Devices component", () => {
    renderComponent();
    expect(screen.getByRole("button", {name: "Add device"})).toBeTruthy();
  });
});
