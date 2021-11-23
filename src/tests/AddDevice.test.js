import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddDevice from "../pages/AddDevice";

describe("AddDevice component", () => {
  test("renders AddDevice component", () => {
    render(
      <BrowserRouter>
        <AddDevice />
      </BrowserRouter>
    );
    expect(screen.getAllByText("Name")).toBeTruthy();
    expect(screen.getAllByText("Device type")).toBeTruthy();
    expect(screen.getAllByText("Endpoint")).toBeTruthy();
    expect(screen.getAllByText("Interface type")).toBeTruthy();
    expect(screen.getAllByText("Metadata")).toBeTruthy();
    expect(screen.getByText("Cancel")).toBeTruthy();
    expect(screen.getByText("Add device")).toBeTruthy();
  });

  test("add button adds another service form", () => {
    render(
      <BrowserRouter>
        <AddDevice />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getAllByText("Endpoint").length).toBeLessThanOrEqual(4);
    expect(screen.getAllByText("Endpoint").length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText("Interface type").length).toBeLessThanOrEqual(4);
    expect(screen.getAllByText("Interface type").length).toBeGreaterThanOrEqual(
      4
    );
    expect(screen.getAllByText("Metadata").length).toBeLessThanOrEqual(4);
    expect(screen.getAllByText("Metadata").length).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole("button", { name: "Remove Service" })).toBeTruthy();
  });

  test("other service form removed when clicking remove service button", () => {
    render(
      <BrowserRouter>
        <AddDevice />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove Service" }));
    expect(screen.getAllByText("Endpoint").length).toBeLessThanOrEqual(2);
    expect(screen.getAllByText("Endpoint").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Interface type").length).toBeLessThanOrEqual(2);
    expect(screen.getAllByText("Interface type").length).toBeGreaterThanOrEqual(
      2
    );
    expect(screen.getAllByText("Metadata").length).toBeLessThanOrEqual(2);
    expect(screen.getAllByText("Metadata").length).toBeGreaterThanOrEqual(2);
  });
});
