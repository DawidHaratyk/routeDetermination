import { screen } from "@testing-library/react";
import { HistoryRouteItem } from "../components/index";
import { renderComponent } from "../utils/renderComponent";

jest.mock("@react-pdf/renderer", () => ({
  PDFDownloadLink: function PDFDownloadLink({ children }) {
    return <>{children}</>;
  },
  StyleSheet: { create: () => {} },
  Font: { register: () => {} },
  Document: (children) => <div>{children}</div>,
  Page: (children) => <div>{children}</div>,
  Text: (children) => <div>{children}</div>,
  View: (children) => <div>{children}</div>,
}));

describe("HistoryRouteItem", () => {
  test("there is no Generate PDF button when not passing additionalClassNames prop", () => {
    renderComponent(
      <HistoryRouteItem
        historyRoute={{
          name: "Kraków - Mielno",
          distance: "45",
          duration: "1000",
          cost: "500",
        }}
        index={5}
      />
    );

    expect(screen.queryByText(/generate pdf/i)).not.toBeInTheDocument();
  });

  test("there is Generate PDF button when passing additionalClassNames prop", () => {
    renderComponent(
      <HistoryRouteItem
        historyRoute={{
          name: "Kraków - Mielno",
          distance: "45",
          duration: "1000",
          cost: "500",
        }}
        index={5}
        additionalClassNames="m-10 p-8"
      />
    );

    expect(screen.getByText(/generate pdf/i)).toBeInTheDocument();
  });
});
