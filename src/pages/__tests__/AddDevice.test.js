import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import AddDevice from "../AddDevice";
import { SnackbarStateContext } from "../../components/context/SnackbarContext";
import "@testing-library/jest-dom";
import DeviceService from "../../services/DeviceService";
import { act } from "react-dom/test-utils";
import Layout from "../../components/Layout";

jest.mock("../../services/DeviceService");

const renderComponent = () => {
  act(() => {
    render(
      <BrowserRouter>
        <SnackbarStateContext>
          <Layout>
            <AddDevice />
          </Layout>
        </SnackbarStateContext>
      </BrowserRouter>
    );
  })
};

const changeTextboxValue = (name, value) => {
  fireEvent.change(screen.getByRole("textbox", { name: name }), {
    target: { value: value },
  });
};

const checkTextboxToHaveValue = (name, value) => {
  expect(screen.getByRole("textbox", { name: name })).toHaveValue(value);
};

const changeDropdownValue = (name, value) => {
  fireEvent.mouseDown(screen.getByRole("button", { name: name }));
  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(value));
};

const checkDropdownToHaveValue = (name, value) => {
  expect(
    screen.getByRole("button", { name: name, value: value })
  ).toBeInTheDocument();
};

const changeSwitchValueInOut = () => {
  fireEvent.click(screen.getByRole("checkbox", { name: "switch in out" }));
};

const clickOnSubmit = () => {
  fireEvent.click(screen.getByRole("button", { name: "Add device" }));
};

describe("AddDevice component", () => {
  test("renders AddDevice component", () => {
    renderComponent();
    expect(screen.getAllByRole("textbox", { name: "device name" }).length).toBe(
      1
    );
    expect(
      screen.getAllByRole("textbox", { name: "device description" }).length
    ).toBe(1);
    expect(screen.getAllByRole("button", { name: "device type" }).length).toBe(
      1
    );
    expect(
      screen.getAllByRole("button", { name: "service interface" }).length
    ).toBe(1);
    expect(
      screen.getAllByRole("checkbox", { name: "switch in out" }).length
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
      screen.getAllByRole("button", { name: "service interface" }).length
    ).toBe(2);
    expect(
      screen.getAllByRole("checkbox", { name: "switch in out" }).length
    ).toBe(2);
    expect(screen.getByRole("button", { name: "Remove Service" })).toBeTruthy();
  });

  test("removes one service form when clicking remove service button", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove Service" }));
    expect(
      screen.getAllByRole("button", { name: "service interface" }).length
    ).toBe(1);
    expect(
      screen.getAllByRole("checkbox", { name: "switch in out" }).length
    ).toBe(1);
  });

  test("inserts data correctly inside device name textfield", () => {
    renderComponent();
    changeTextboxValue("device name", "Test name");
    checkTextboxToHaveValue("device name", "Test name");
  });

  test("inserts data correctly inside device description textfield", () => {
    renderComponent();
    changeTextboxValue("device description", "Test description");
    checkTextboxToHaveValue("device description", "Test description");
  });

  test("selects an option correctly inside device type dropdown", () => {
    renderComponent();
    changeDropdownValue("device type", "Sensing");
    checkDropdownToHaveValue("device type", "Sensing");
  });

  test("selects an option correctly inside interface type dropdown", () => {
    renderComponent();
    changeDropdownValue("service interface", "TCP");
    checkDropdownToHaveValue("service interface", "TCP");
  });

  test("changes in out switch correctly", () => {
    renderComponent();
    expect(
      screen.getByRole("checkbox", { name: "switch in out" }).checked
    ).toBe(true);
    changeSwitchValueInOut();
    expect(
      screen.getByRole("checkbox", { name: "switch in out" }).checked
    ).toBe(false);
  });
});

describe("MQTTForm component", () => {
  test("renders MQTTForm component", () => {
    renderComponent();
    expect(
      screen.getByRole("textbox", { name: "mqtt broker" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "mqtt port" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "mqtt topic" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "mqtt qos" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "mqtt protocol version" })
    ).toBeInTheDocument();
  });

  test("inserts data in all fields correctly with MQTT", () => {
    renderComponent();
    changeTextboxValue("mqtt broker", "Test broker");
    checkTextboxToHaveValue("mqtt broker", "Test broker");
    changeTextboxValue("mqtt port", "Test port");
    checkTextboxToHaveValue("mqtt port", "Test port");
    changeTextboxValue("mqtt topic", "Test topic");
    checkTextboxToHaveValue("mqtt topic", "Test topic");
    changeDropdownValue("mqtt qos", "1");
    checkDropdownToHaveValue("mqtt qos", "1");
    changeDropdownValue("mqtt protocol version", "V3.1.1");
    checkDropdownToHaveValue("mqtt protocol version", "V3.1.1");
  });

  test("submits form without all fields filled with MQTT", () => {
    renderComponent();
    clickOnSubmit();
    expect(screen.getByText("Please fill the form")).toBeInTheDocument();
  })

  test("submits form correctly with MQTT", async () => {
    DeviceService.createDevice.mockResolvedValue({
      something: true,
    });
    renderComponent();
    changeTextboxValue("device name", "Dev1");
    changeTextboxValue("mqtt broker", "Test broker");
    changeTextboxValue("mqtt topic", "Test topic");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
  });
});

describe("HTTPForm component", () => {
  test("renders HTTPForm component", () => {
    renderComponent();
    changeDropdownValue("service interface", "HTTP");
    expect(
      screen.getByRole("textbox", { name: "http url" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "http method" })
    ).toBeInTheDocument();
    changeSwitchValueInOut();
    expect(
      screen.getByRole("textbox", { name: "http status" })
    ).toBeInTheDocument();
  });

  test("inserts data in all fields correctly with HTTP", () => {
    renderComponent();
    changeDropdownValue("service interface", "HTTP");
    changeTextboxValue("http url", "Test url");
    checkTextboxToHaveValue("http url", "Test url");
    changeDropdownValue("http method", "POST");
    checkDropdownToHaveValue("http method", "POST");
    changeSwitchValueInOut();
    changeTextboxValue("http status", "Test status");
    checkTextboxToHaveValue("http status", "Test status");
  });

  test("submits form without all fields filled with HTTP", () => {
    renderComponent();
    changeDropdownValue("service interface", "HTTP");
    clickOnSubmit();
    expect(screen.getByText("Please fill the form")).toBeInTheDocument();
  });

  test("submits form correctly with HTTP", async () => {
    DeviceService.createDevice.mockResolvedValue({
      something: true,
    });
    renderComponent();
    changeDropdownValue("service interface", "HTTP");
    changeTextboxValue("device name", "Dev1");
    changeTextboxValue("http url", "Test url");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
  });
});

describe("WebSocketForm component", () => {
  test("renders WebSocketForm component", () => {
    renderComponent();
    changeDropdownValue("service interface", "WebSocket");
    expect(
      screen.getByRole("button", { name: "web socket type" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "web socket path" })
    ).toBeInTheDocument();
    changeDropdownValue("web socket type", "Client");
    expect(
      screen.getByRole("textbox", { name: "web socket url" })
    ).toBeInTheDocument();
  });

  test("inserts data in all fields correctly with WebSocket", () => {
    renderComponent();
    changeDropdownValue("service interface", "WebSocket");
    changeTextboxValue("web socket path", "Test path");
    checkTextboxToHaveValue("web socket path", "Test path");
    changeDropdownValue("web socket type", "Client");
    checkDropdownToHaveValue("web socket type", "Client");
    changeTextboxValue("web socket url", "Test url");
    checkTextboxToHaveValue("web socket url", "Test url");
  });

  test("submits form without all fields filled with WebSocket", () => {
    renderComponent();
    changeDropdownValue("service interface", "WebSocket");
    clickOnSubmit();
    expect(screen.getByText("Please fill the form")).toBeInTheDocument();
  });

  test("submits form correctly with WebSocket", async () => {
    DeviceService.createDevice.mockResolvedValue({
      something: true,
    });
    renderComponent();
    changeDropdownValue("service interface", "WebSocket");
    changeTextboxValue("device name", "Dev1");
    changeTextboxValue("web socket path", "Test path");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
    changeDropdownValue("web socket type", "Client");
    changeTextboxValue("web socket url", "Test url");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
  });
});

describe("TCPForm component", () => {
  test("renders TCPForm component", () => {
    renderComponent();
    changeDropdownValue("service interface", "TCP");
    expect(
      screen.getByRole("button", { name: "tcp type in" })
    ).toBeInTheDocument();
    changeDropdownValue("tcp type in", "Client");
    expect(
      screen.getByRole("textbox", { name: "tcp host" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "tcp port" })
    ).toBeInTheDocument();
    changeSwitchValueInOut();
    expect(
      screen.getByRole("button", { name: "tcp type out" })
    ).toBeInTheDocument();
    changeDropdownValue("tcp type out", "Client");
    expect(
      screen.getByRole("textbox", { name: "tcp host" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "tcp port" })
    ).toBeInTheDocument();
    changeSwitchValueInOut();
  });

  test("inserts data in all fields correctly with TCP", () => {
    renderComponent();
    changeDropdownValue("service interface", "TCP");
    changeDropdownValue("tcp type in", "Client");
    checkDropdownToHaveValue("tcp type in", "Client");
    changeTextboxValue("tcp host", "Test host");
    checkTextboxToHaveValue("tcp host", "Test host");
    changeTextboxValue("tcp port", "Test port");
    checkTextboxToHaveValue("tcp port", "Test port");
    changeSwitchValueInOut();
    changeDropdownValue("tcp type out", "Client");
    checkDropdownToHaveValue("tcp type out", "Client");
    changeTextboxValue("tcp host", "Test host 2");
    checkTextboxToHaveValue("tcp host", "Test host 2");
    changeTextboxValue("tcp port", "Test port 2");
    checkTextboxToHaveValue("tcp port", "Test port 2");
  });

  test("submits form without all fields filled with TCP", () => {
    renderComponent();
    changeDropdownValue("service interface", "TCP");
    clickOnSubmit();
    expect(screen.getByText("Please fill the form")).toBeInTheDocument();
  });

  test("submits form correctly with TCP", async () => {
    DeviceService.createDevice.mockResolvedValue({
      something: true,
    });
    renderComponent();
    changeDropdownValue("service interface", "TCP");
    changeTextboxValue("device name", "Dev1");
    changeDropdownValue("tcp type in", "Client");
    changeTextboxValue("tcp host", "Test host");
    changeTextboxValue("tcp port", "Test port");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
    changeSwitchValueInOut();
    changeDropdownValue("tcp type out", "Client");
    changeTextboxValue("tcp host", "Test host 2");
    changeTextboxValue("tcp port", "Test port 2");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
  });
});

describe("UDPForm component", () => {
  test("renders UDPForm component", () => {
    renderComponent();
    changeDropdownValue("service interface", "UDP");
    expect(
      screen.getByRole("textbox", { name: "udp port" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "udp ipv" })).toBeInTheDocument();
    changeSwitchValueInOut();
    expect(
      screen.getByRole("textbox", { name: "udp address" })
    ).toBeInTheDocument();
  });

  test("inserts data in all fields correctly with UDP", () => {
    renderComponent();
    changeDropdownValue("service interface", "UDP");
    changeTextboxValue("udp port", "Test port");
    checkTextboxToHaveValue("udp port", "Test port");
    changeDropdownValue("udp ipv", "IPv6");
    checkDropdownToHaveValue("udp ipv", "IPv6");
    changeSwitchValueInOut();
    changeTextboxValue("udp address", "Test address");
    checkTextboxToHaveValue("udp address", "Test address");
  });

  test("submits form without all fields filled with UDP", () => {
    renderComponent();
    changeDropdownValue("service interface", "UDP");
    clickOnSubmit();
    expect(screen.getByText("Please fill the form")).toBeInTheDocument();
  });

  test("submits form correctly with UDP", async () => {
    DeviceService.createDevice.mockResolvedValue({
      something: true,
    });
    renderComponent();
    changeDropdownValue("service interface", "UDP");
    changeSwitchValueInOut();
    changeTextboxValue("device name", "Dev1");
    changeTextboxValue("udp address", "Test address");
    changeTextboxValue("udp port", "Test port");
    await act(async () => {
      clickOnSubmit();
      await expect(
        screen.findByText("Device added successfully")
      ).resolves.toBeInTheDocument();
    });
  });
});
