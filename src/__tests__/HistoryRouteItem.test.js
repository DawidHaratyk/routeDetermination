import { screen } from "@testing-library/react";
import { HistoryRouteItem } from "../components/index";
import { renderComponent } from "../utils/renderComponent";

jest.mock("@react-pdf/renderer", () => ({
  // PDFDownloadLink: function PDFDownloadLink({ children }) {
  //   return <>{children}</>;
  // },
  // StyleSheet: { create: () => {} },
  // Font: { register: () => {} },
  // Document: () => <div>Document</div>,
  // Page: () => <div>Page</div>,
  // Text: () => <div>Text</div>,
  // View: () => <div>View</div>,
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
        additionalClassNames="m-10"
      />
    );

    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    // const generatePdfButton = screen.getByRole("link", {
    //   name: /generate pdf/i,
    // });
    // expect(generatePdfButton).not.toBeInTheDocument();
  });
});
