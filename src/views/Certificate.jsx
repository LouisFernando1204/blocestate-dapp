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
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: "90%", // Adjusted the width to 90% to fit better within the page
  },
  textContainer: {
    // marginLeft: 20,
  },
  headerContainer: {
    alignItems: "center", // Keep the header in the center
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
  boldNumber: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textNumber: {
    fontSize: 14,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 25,
    marginBottom: 25,
  },
  inline: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 6,
  },
  inlineNumber: {
    flexDirection: "row",
    marginTop: 14,
    marginBottom: 10,
    justifyContent: "center", // Keep the certificate number in the center
  },
});

export default function Certificate({
  certificateNumber,
  province,
  city,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header and Image in the Center */}
        <View style={[styles.container, styles.headerContainer]}>
          <Text style={styles.header}>BADAN PERTAHANAN NASIONAL</Text>
          <Text style={styles.header}>REPUBLIK INDONESIA</Text>
          <Image
            source="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg/1200px-National_emblem_of_Indonesia_Garuda_Pancasila.svg.png"
            style={styles.image}
          />
          <Text style={styles.header}>SERTIFIKAT</Text>
          <Text style={styles.header}>HAK MILIK ATAS SATUAN PROPERTI</Text>
        </View>

        {/* Certificate Number in the Center */}
        <View style={styles.inlineNumber}>
          <Text style={styles.boldNumber}>Nomor : </Text>
          <Text style={styles.textNumber}>{certificateNumber}</Text>
        </View>

        {/* Provinsi and Kabupaten/Kota Aligned Left, but shifted to the right */}
        <View style={styles.textContainer}>
          <View style={styles.inline}>
            <Text style={styles.boldText}>PROVINSI                : </Text>
            <Text style={styles.text}>{province}</Text>
          </View>

          <View style={styles.inline}>
            <Text style={styles.boldText}>KABUPATEN/KOTA  : </Text>
            <Text style={styles.text}>{city}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
