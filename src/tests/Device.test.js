import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Device from "../components/Device";
import '@testing-library/jest-dom/extend-expect';

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Device />
    </BrowserRouter>
  );
}

describe("Devices component", () => {
  test("renders Devices component", async () => {
    renderComponent();
    expect(screen.getByText("View information")).toBeInTheDocument();
  });
});
