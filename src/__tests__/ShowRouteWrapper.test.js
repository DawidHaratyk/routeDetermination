import { screen } from "@testing-library/react";
import { ShowRouteWrapper } from "../components";
import { renderComponent } from "../utils/renderComponent";

test("check if passing children will display them correctly", () => {
  renderComponent(
    <ShowRouteWrapper>
      <h1>hello world!</h1>
    </ShowRouteWrapper>
  );

  expect(
    screen.getByRole("heading", { name: /hello world!/i })
  ).toBeInTheDocument();
});
