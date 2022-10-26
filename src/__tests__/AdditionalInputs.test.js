import { screen } from "@testing-library/react";
import { AdditionalInputs } from "../components/AdditionalInputs";
import { renderComponent } from "../utils/renderComponent";

test("if props are displayed appropriately", () => {
  renderComponent(
    <AdditionalInputs
      firstIntermediateStop="kraków"
      secondIntermediateStop="mielnooo"
    />
  );

  const firstAdditionalInput =
    screen.getByPlaceholderText(/intermediate stop 1/i);
  expect(firstAdditionalInput).toHaveValue("kraków");

  const secondAdditionalInput =
    screen.getByPlaceholderText(/intermediate stop 2/i);
  expect(secondAdditionalInput).toHaveValue("mielnooo");
});
