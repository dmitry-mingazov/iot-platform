import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Flows from "../Flows";
import "@testing-library/jest-dom/extend-expect";
import RequireAuth from "../../RequireAuth";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "../../components/context/AuthContext";
import { act } from "react-dom/test-utils";
import { NodeRedContext } from "../../components/context/NodeRedContext";
import DeviceService from "../../services/DeviceService";

jest.mock("@auth0/auth0-react");
jest.mock("../../services/DeviceService");
jest.mock("../../components/context/SnackbarContext", () => ({
  useSnackbar: () => ({
    openSnackbar: jest.fn(),
    closeSnackbar: jest.fn()
  })
}));

const isTokenReady = true;
const flows = [
  { id: "f53ce43842630fb9", type: "tab", label: "Device 1 flow" },
  {
    id: "61bcd18bc5fe9a0e1b917f43|0",
    type: "http response",
    z: "f53ce43842630fb9",
    name: "Device 1",
    statusCode: "200",
    wires: [],
    x: 120,
    y: 120,
  },
  {
    id: "888aaf0ecbd405de",
    type: "comment",
    z: "f53ce43842630fb9",
    name: "",
    info: "Test commento",
    wires: [],
    x: 120,
    y: 60,
  },
];

const renderComponent = () => {
  render(
    <AuthContext.Provider value={{ isTokenReady }}>
      <NodeRedContext.Provider value={{ flows }}>
        <BrowserRouter>
          <RequireAuth>
            <Flows />
          </RequireAuth>
        </BrowserRouter>
      </NodeRedContext.Provider>
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
      _id: '61bcd18bc5fe9a0e1b917f43',
      name: 'Device 1'
    }
  ]);
});

describe("Flows component", () => {
  test("renders Flows component", async () => {
    await act(async () => {
      renderComponent();
    });
  });

  test("renders grid component", async () => {
    await act(async () => {
      renderComponent();
    });
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Comment" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Devices" })
    ).toBeInTheDocument();
  });

  test("renders rows", async () => {
    await act(async () => {
      renderComponent();
    });
    expect(
      screen.getByRole("cell", { name: "Device 1 flow" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "Test commento" })
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Device 1" })).toBeInTheDocument();
  });
});
