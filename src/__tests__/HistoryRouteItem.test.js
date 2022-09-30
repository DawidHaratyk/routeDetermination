import { render } from "@testing-library/react";
import { HistoryRouteItem } from "../components";

test("check if historyRouteItem component has a Generate PDF button in /foundRoute router path", () => {
  render(
    <HistoryRouteItem
      historyRoute={{
        name: "name",
        distance: "distance",
        duration: "duration",
        cost: "cost",
      }}
      index={0}
      additionalClassNames="additionalClassNames"
    />
  );
});
