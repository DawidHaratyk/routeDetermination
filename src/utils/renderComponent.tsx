import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RouteProvider } from "../contexts/RouteContext";

export const renderComponent = (testingComponent: JSX.Element) => {
  render(
    <BrowserRouter>
      <RouteProvider>{testingComponent}</RouteProvider>
    </BrowserRouter>
  );
};
