import React from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import DeviceCard from "../DeviceCard";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import DeviceService from "../../services/DeviceService";

jest.mock("../../services/DeviceService");

const renderComponent = () => {
  act(() => {
    render(
      <BrowserRouter>
        <DeviceCard />
      </BrowserRouter>
    );
  });
};

const mockGetDevice = () => {
  DeviceService.getDevice.mockResolvedValue({
    _id: 1,
    name: "Device1",
    description: "Test description",
    devtype: "Sensing",
    services: [
      {
        interfaceType: "mqtt in",
        endpoint: "endpoint",
        metadata: [
          {
            metadataType: "broker",
            value: "broker test value",
          },
          {
            metadataType: "urlBroker",
            value: "url test value",
          }
        ],
      },
    ],
  });
};

const openInformatioNDialog = async () => {
  mockGetDevice();
  fireEvent.click(screen.getByRole("button"));
  await act(async () => {
    fireEvent.click(screen.getByRole("menuitem", { name: "View information" }));
  });
};

describe("DeviceCard component", () => {
  test("renders DeviceCard component", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });

  test("opens menu correctly when clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("menuitem").length).toBe(6);
  });

  test("opens information dialog", async () => {
    renderComponent();
    const getDevice = jest.spyOn(DeviceService, "getDevice");
    await openInformatioNDialog();
    expect(getDevice).toBeCalled();
  });

  test("checks device information", async () => {
    renderComponent();
    await openInformatioNDialog();
    expect(
      screen.getByRole("row", { name: "Name Device1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "Description Test description" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "Type Sensing" })
    ).toBeInTheDocument();
    expect(screen.getByRole("row", { name: "Service #1" })).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "Interface type mqtt in" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "Broker broker test value" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "Url broker url test value" })
    ).toBeInTheDocument();
  });
});
