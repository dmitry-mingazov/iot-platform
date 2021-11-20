import React from "react";
import { render, screen } from "@testing-library/react";
import Devices from "../pages/Devices";

describe("Devices component", () => {
  test("renders Devices component", () => {
    render(<Devices />);

    expect(screen.getByText("Add device")).toBeTruthy();
  });
});
