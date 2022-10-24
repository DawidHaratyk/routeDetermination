import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { RouteDetermination } from "../components";
import { RouteProvider } from "../contexts/RouteContext";

describe("RouteDetermination", () => {
  test("check if initial state is correct on first render and on click (add intermediate stops) button", () => {
    render(
      <BrowserRouter>
        <RouteProvider>
          <RouteDetermination />
        </RouteProvider>
      </BrowserRouter>
    );

    // check if on initial render the AdditionalInputs component is not visible
    const additionalInputsContainer = screen.queryByTestId(
      "additional-inputs-container"
    );
    expect(additionalInputsContainer).not.toBeInTheDocument();

    // click (add intermediate stops) button
    const addIntermediateStopsButton = screen.getByRole("button", {
      name: /add intermediate stops/i,
    });
    userEvent.click(addIntermediateStopsButton);

    // check state of additional inputs (they should be empty)
    const firstIntermediateStopInputValue =
      screen.getByPlaceholderText(/intermediate stop 1/i).textContent;
    expect(firstIntermediateStopInputValue).toBe("");
    const secondIntermediateStopInputValue =
      screen.getByPlaceholderText(/intermediate stop 2/i).textContent;
    expect(secondIntermediateStopInputValue).toBe("");

    // check additional inputs visibility
    const visibleAdditionalInputsContainer = screen.queryByTestId(
      "additional-inputs-container"
    );
    expect(visibleAdditionalInputsContainer).toBeInTheDocument();

    // click (add intermediate stops) button
    userEvent.click(addIntermediateStopsButton);

    // check if AdditionalInputs component is not visible
    expect(additionalInputsContainer).not.toBeInTheDocument();
  });

  test("check if alert is visible when (from where input) value is empty", async () => {
    render(
      <BrowserRouter>
        <RouteProvider>
          <RouteDetermination />
        </RouteProvider>
      </BrowserRouter>
    );

    const fromWhereInput = screen.getByPlaceholderText(/from where/i).value;
    expect(fromWhereInput).toBe("");

    const submitButton = screen.getByRole("button", { name: /search/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      const warning = screen.getByText(/wrong from where value entered!/i);

      expect(warning).toBeInTheDocument();
    });
  });

  test("check if alert is visible when (from to input) value is empty", async () => {
    render(
      <BrowserRouter>
        <RouteProvider>
          <RouteDetermination />
        </RouteProvider>
      </BrowserRouter>
    );

    const fromToInput = screen.getByPlaceholderText(/to where/i).value;
    expect(fromToInput).toBe("");

    const submitButton = screen.getByRole("button", { name: /search/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      const warning = screen.getByText(/wrong from to value entered!/i);

      expect(warning).toBeInTheDocument();
    });
  });
});
