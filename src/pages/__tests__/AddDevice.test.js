import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import AddDevice from "../AddDevice";
import { SnackbarStateContext } from "../../components/context/SnackbarContext";
import "@testing-library/jest-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <SnackbarStateContext>
        <AddDevice />
      </SnackbarStateContext>
    </BrowserRouter>
  );
};

describe("AddDevice component", () => {
  test("renders AddDevice component", () => {
    renderComponent();
    expect(screen.getAllByRole("textbox", { name: "device name" }).length).toBe(
      1
    );
    expect(screen.getAllByRole("button", { name: "device type" }).length).toBe(
      1
    );
    expect(
      screen.getAllByRole("textbox", { name: "service endpoint" }).length
    ).toBe(1);
    expect(
      screen.getAllByRole("button", { name: "service interface" }).length
    ).toBe(1);
    expect(
      screen.getAllByRole("textbox", { name: "service metadata" }).length
    ).toBe(1);
    expect(screen.getAllByRole("button", { name: "Add" }).length).toBe(1);
    expect(screen.getAllByRole("button", { name: "Cancel" }).length).toBe(1);
    expect(screen.getAllByRole("button", { name: "Add device" }).length).toBe(
      1
    );
  });

  test("adds another service form", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(
      screen.getAllByRole("textbox", { name: "service endpoint" }).length
    ).toBe(2);
    expect(
      screen.getAllByRole("button", { name: "service interface" }).length
    ).toBe(2);
    expect(
      screen.getAllByRole("textbox", { name: "service metadata" }).length
    ).toBe(2);
    expect(screen.getByRole("button", { name: "Remove Service" })).toBeTruthy();
  });

  test("removes one service form when clicking remove service button", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove Service" }));
    expect(
      screen.getAllByRole("textbox", { name: "service endpoint" }).length
    ).toBe(1);
    expect(
      screen.getAllByRole("button", { name: "service interface" }).length
    ).toBe(1);
    expect(
      screen.getAllByRole("textbox", { name: "service metadata" }).length
    ).toBe(1);
  });

  test("inserts data correctly inside device name textfield", () => {
    renderComponent();
    fireEvent.change(screen.getByRole("textbox", { name: "device name" }), {
      target: { value: "Test name" },
    });
    expect(
      screen.getByRole("textbox", { name: "device name", value: "Test name" })
    ).toBeInTheDocument();
  });

  test("selects an option correctly inside device type dropdown", () => {
    renderComponent();
    fireEvent.mouseDown(screen.getByRole("button", { name: "device type" }));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("Sensing"));
    expect(screen.getAllByText("Sensing")).toBeTruthy();
  });

  test("inserts data correctly inside endpoint textfield", () => {
    renderComponent();
    fireEvent.change(
      screen.getByRole("textbox", { name: "service endpoint" }),
      {
        target: { value: "Test endpoint" },
      }
    );
    expect(
      screen.getByRole("textbox", {
        name: "service endpoint",
        value: "Test endpoint",
      })
    ).toBeInTheDocument();
  });

  test("selects an option correctly inside interface type dropdown", () => {
    renderComponent();
    fireEvent.mouseDown(
      screen.getByRole("button", { name: "service interface" })
    );
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("TCP"));
    expect(screen.getAllByText("TCP")).toBeTruthy();
  });

  test("inserts data correctly inside metadata textfield", () => {
    renderComponent();
    fireEvent.change(
      screen.getByRole("textbox", { name: "service metadata" }),
      {
        target: { value: "Test metadata" },
      }
    );
    expect(
      screen.getByRole("textbox", {
        name: "service metadata",
        value: "Test metadata",
      })
    ).toBeInTheDocument();
  });

  test("submits form with only device name field filled and get errors", () => {
    renderComponent();
    fireEvent.change(screen.getByRole("textbox", { name: "device name" }), {
      target: { value: "Test name" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add device" }));
    expect(screen.getByRole("textbox", { name: "device name" })).toHaveValue(
      "Test name"
    );
  });

  test("submits form with only endpoint field filled and get errors", () => {
    renderComponent();
    fireEvent.change(
      screen.getByRole("textbox", { name: "service endpoint" }),
      {
        target: { value: "Test endpoint" },
      }
    );
    fireEvent.click(screen.getByRole("button", { name: "Add device" }));
    expect(
      screen.getByRole("textbox", { name: "service endpoint" })
    ).toHaveValue("Test endpoint");
  });

  test("submits form correctly", () => {
    renderComponent();
    fireEvent.change(screen.getByRole("textbox", { name: "device name" }), {
      target: { value: "Test name" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "service endpoint" }),
      {
        target: { value: "Test endpoint" },
      }
    );
    fireEvent.change(
      screen.getByRole("textbox", { name: "service metadata" }),
      {
        target: { value: "Test metadata" },
      }
    );
    fireEvent.click(screen.getByRole("button", { name: "Add device" }));
    expect(screen.getByRole("textbox", { name: "device name" })).toHaveValue(
      ""
    );
  });
});
