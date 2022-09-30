import { render, screen } from "@testing-library/react";
import { PricePerKilometerView } from "../components";
import { RouteProvider } from "../contexts/RouteContext";

test("check if initial state is correct", () => {
  render(
    <RouteProvider>
      <PricePerKilometerView ratePerKilometer={0.5} />
    </RouteProvider>
  );

  expect(Number(screen.getByRole("spinbutton").value)).toBe(0.5);
});
