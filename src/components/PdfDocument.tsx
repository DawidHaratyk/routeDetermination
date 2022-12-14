import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { HistoryRoute } from "../types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
  },
  largerText: {
    fontSize: "16px",
    textAlign: "justify",
    padding: "0 40px",
  },
  routeName: {
    display: "flex",
    alignItems: "center",
    marginTop: "30px",
  },
  details: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  },
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

export const PdfDocument = ({
  name,
  distance,
  duration,
  cost,
}: HistoryRoute) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.routeName}>
          <Text style={styles.largerText}>{name}</Text>
        </View>
        <View style={styles.details}>
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <Text>Cost: {cost}</Text>
        </View>
      </Page>
    </Document>
  );
};
