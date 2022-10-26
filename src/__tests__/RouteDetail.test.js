import { screen } from "@testing-library/react";
import { RouteDetail } from "../components";
import { renderComponent } from "../utils/renderComponent";

test("correct value when passing props to RouteDetail", () => {
  renderComponent(
    <RouteDetail
      containerClasses="m-10 p-6 flex"
      detailName="cost"
      detailValue="5zł"
    />
  );

  const detailNameElement = screen.getByTestId("container");
  const detailValueElement = screen.getByTestId("value");

  expect(detailNameElement).toHaveTextContent(/cost/);
  expect(detailNameElement).toHaveClass("m-10 p-6 flex");
  expect(detailValueElement).toHaveTextContent("5zł");
});

test("containerClasses prop when we are not passing it", () => {
  renderComponent(<RouteDetail />);

  const detailNameElement = screen.getByTestId("container");
  expect(detailNameElement).toHaveClass("text-xs");
});
