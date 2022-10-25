import { PDFDownloadLink } from "@react-pdf/renderer";
import classNames from "classnames";
import { HistoryRoute } from "../types";
import { PdfDocument } from "./PdfDocument";
import { RouteDetail } from "./index";

interface HistoryRouteI {
  historyRoute: HistoryRoute;
  index: number;
  additionalClassNames?: string;
}

export function HistoryRouteItem({
  historyRoute,
  index,
  additionalClassNames,
}: HistoryRouteI) {
  const { name, distance, duration, cost } = historyRoute;
  const currentIndex = index + 1;

  const containerClasses = classNames(
    `flex w-11/12 md:w-4/5 h-24 lg:h-28 bg-green-50 border-2 border-green-500 rounded-md mb-3 items-center ${additionalClassNames}`,
    {
      "h-44": additionalClassNames,
    }
  );

  const detailsClasses = classNames({
    "mb-2": additionalClassNames,
  });

  return (
    <div className={containerClasses}>
      <div className="flex justify-center items-center border-r-[1px] border-black border-opacity-40 sm:px-4 h-full">
        <span className="rounded-full bg-green-400 w-10 h-10 text-center leading-10 text-white text-2xl mx-2">
          {currentIndex}
        </span>
      </div>
      <div className="py-2 px-4 lg:px-10 flex flex-col justify-center table">
        <h6 className="font-bold line-clamp-1" title={name}>
          {name}
        </h6>
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className={detailsClasses}>
            <RouteDetail
              containerClasses="text-xs inline-block mr-5 lg:mr-12 sm:mr-4"
              detailName="Odległość drogowa:"
              detailValue={distance}
            />
            <RouteDetail
              containerClasses="text-xs inline-block mr-5 lg:mr-12 sm:mr-4"
              detailName="Czas przejazdu:"
              detailValue={duration}
            />
            <RouteDetail
              containerClasses="text-xs inline-block mr-2 lg:mr-12 sm:mr-4"
              detailName="Koszt przejazdu:"
              detailValue={cost}
            />
          </div>
          {additionalClassNames && (
            <PDFDownloadLink
              document={<PdfDocument {...historyRoute} />}
              fileName="routeDetails"
              className="bg-green-400 text-white mr-4 w-36 text-sm text-center table-cell align-middle rounded p-2"
              key={historyRoute.cost}
            >
              Generate PDF
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
}
