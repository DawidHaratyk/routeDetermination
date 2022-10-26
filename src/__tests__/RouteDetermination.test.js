import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouteDetermination } from "../components";
import { renderComponent } from "../utils/renderComponent";

describe("RouteDetermination", () => {
  test("check if initial state is correct on first render and on click (add intermediate stops) button", () => {
    renderComponent(<RouteDetermination />);

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
      screen.getByPlaceholderText(/intermediate stop 1/i);
    expect(firstIntermediateStopInputValue).toHaveValue("");
    const secondIntermediateStopInputValue =
      screen.getByPlaceholderText(/intermediate stop 2/i);
    expect(secondIntermediateStopInputValue).toHaveValue("");

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
    renderComponent(<RouteDetermination />);

    const fromWhereInput = screen.getByPlaceholderText(/from where/i);
    expect(fromWhereInput).toHaveValue("");

    const submitButton = screen.getByRole("button", { name: /search/i });
    userEvent.click(submitButton);

    const warning = await screen.findByText(/wrong from where value entered!/i);
    expect(warning).toBeInTheDocument();
  });

  test("check if alert is visible when (from to input) value is empty", async () => {
    renderComponent(<RouteDetermination />);

    const fromToInput = screen.getByPlaceholderText(/to where/i);
    expect(fromToInput).toHaveValue("");

    const submitButton = screen.getByRole("button", { name: /search/i });
    userEvent.click(submitButton);

    const warning = await screen.findByText(/wrong from to value entered!/i);
    expect(warning).toBeInTheDocument();
  });

  test("check intermediateStopsButtonText initial value", () => {
    renderComponent(<RouteDetermination />);

    const intermediateStopsButton = screen.getByRole("button", {
      name: /add intermediate stops/i,
    });
    expect(intermediateStopsButton).toHaveTextContent(
      /add intermediate stops/i
    );
  });
});
