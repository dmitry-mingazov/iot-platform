import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Devices from "../pages/Devices";
import "@testing-library/jest-dom/extend-expect";
import RequireAuth from "../RequireAuth";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "../components/context/AuthContext";
import DeviceService from "../services/DeviceService";
import { act } from "react-dom/test-utils";

jest.mock("@auth0/auth0-react");
jest.mock("../services/DeviceService");

const isTokenReady = true;

const renderComponent = () => {
  render(
    <AuthContext.Provider value={{ isTokenReady }}>
      <BrowserRouter>
        <RequireAuth>
          <Devices />
        </RequireAuth>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

beforeEach(() => {
  useAuth0.mockReturnValue({
    isLoading: false,
    isAuthenticated: true,
    getAccessTokenSilently: jest.fn(() => new Promise(() => "tokenfinto")),
  });
  DeviceService.getDevices.mockResolvedValue([
    {
      _id: 1,
      name: "Device1",
    },
    {
      _id: 2,
      name: "Device2",
    },
  ]);
});

describe("Devices component", () => {
  test("renders Devices component", async () => {
    const getDevices = jest.spyOn(DeviceService, "getDevices");
    await act(async () => {
      renderComponent();
    });
    expect(
      screen.getByRole("button", { name: "Add device" })
    ).toBeInTheDocument();
    expect(getDevices).toBeCalled();
    expect(screen.getByRole("button", { name: "Device1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Device2" })).toBeInTheDocument();
  });
});
