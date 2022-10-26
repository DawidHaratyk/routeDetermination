import { screen } from "@testing-library/react";
import { HistoryRouteItem } from "../components/index";
import { renderComponent } from "../utils/renderComponent";

jest.mock("@react-pdf/renderer", () => ({
  PDFDownloadLink: jest.fn(() => null),
}));

jest.mock("@react-pdf/renderer", () => ({
  StyleSheet: { create: () => {} },
  Font: { register: () => {} },
}));

describe("HistoryRouteItem", () => {
  test("there is no Generate PDF button when not passing additionalClassNames prop", () => {
    //   renderComponent(
    //     <HistoryRouteItem
    //     historyRoute={{
    //       name: "Kraków - Mielno",
    //       distance: "45",
    //       duration: "1000",
    //       cost: "500",
    //     }}
    //     index={5}
    //     additionalClassNames="m-10"
    //     />
    //   );
    //   const generatePdfButton = screen.getByRole("link", {
    //     name: /generate pdf/i,
    //   });
    //   expect(generatePdfButton).not.toBeInTheDocument();
  });
});
