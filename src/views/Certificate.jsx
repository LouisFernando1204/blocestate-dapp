/* eslint-disable react/prop-types */
import {
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  Document,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: "85%", // Slightly reduced width for better centering
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
  },
  text: {
    fontSize: 15,
    color: "#333333",
  },
  boldNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  textNumber: {
    fontSize: 16,
    color: "#333333",
  },
  boldText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333333",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  inline: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 6,
    alignItems: "baseline",
  },
  inlineNumber: {
    flexDirection: "row",
    marginTop: 14,
    marginBottom: 10,
    justifyContent: "center",
  },
});

export default function Certificate({
  certificateNumber,
  province,
  city,
  address,
  postalCode
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.container, styles.headerContainer]}>
          <Text style={styles.header}>BADAN PERTANAHAN NASIONAL</Text>
          <Text style={styles.header}>REPUBLIK INDONESIA</Text>
          <Image
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg/1200px-National_emblem_of_Indonesia_Garuda_Pancasila.svg.png"
            style={styles.image}
          />
          <Text style={styles.header}>SERTIFIKAT</Text>
          <Text style={styles.header}>HAK MILIK ATAS SATUAN PROPERTI</Text>
        </View>

        {/* Certificate Number */}
        <View style={styles.inlineNumber}>
          <Text style={styles.boldNumber}>Nomor :</Text>
          <Text style={styles.textNumber}> {certificateNumber}</Text>
        </View>

        {/* Location Details */}
        <View style={styles.container}>
          <View style={styles.inline}>
            <Text style={styles.boldText}>PROVINSI:</Text>
            <Text style={styles.text}> {province}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.boldText}>KABUPATEN/KOTA:</Text>
            <Text style={styles.text}> {city}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.boldText}>ALAMAT:</Text>
            <Text style={styles.text}> {address}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.boldText}>KODE POS:</Text>
            <Text style={styles.text}> {postalCode}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}