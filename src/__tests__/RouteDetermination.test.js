import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { RouteDetermination } from "../components";
import { RouteProvider } from "../contexts/RouteContext";

// why sometimes I have to create new varaible for the same DOM element? and sometimes I don't have to

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
