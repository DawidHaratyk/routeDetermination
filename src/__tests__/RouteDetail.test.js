import { screen } from "@testing-library/react";
import { RouteDetail } from "../components";
import { renderComponent } from "../utils/renderComponent";

test("if there is correct value when passing props to RouteDetail", () => {
  renderComponent(<RouteDetail detailName="cost" detailValue="5zł" />);

  const detailNameElement = screen.getByTestId("container");
  const detailValueElement = screen.getByTestId("value");

  expect(detailNameElement).toHaveTextContent(/cost/);
  expect(detailValueElement).toHaveTextContent("5zł");
});
