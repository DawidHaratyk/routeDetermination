import { render, screen } from "@testing-library/react";
import { Input } from "../components";
import { RouteProvider } from "../contexts/RouteContext";

describe("inputs", () => {
  test("check if initial value of first input is correct", () => {
    render(
      <RouteProvider>
        <Input placeholder="From where" />
      </RouteProvider>
    );

    const fromWhereInputValue =
      screen.getByPlaceholderText(/from where/i).value;
    expect(fromWhereInputValue).toBe("");
  });

  test("check if initial value of second input is correct", () => {
    render(
      <RouteProvider>
        <Input placeholder="To where" />
      </RouteProvider>
    );

    const toWhereInputValue = screen.getByPlaceholderText(/to where/i).value;
    expect(toWhereInputValue).toBe("");
  });
});
