import {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
  },
  container: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

export default function CertificateDocument({
  certificateNumber,
  address,
  province,
  city,
  postalCode,
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.text}>BADAN PERTAHANAN NASIONAL</Text>
          <Image
            source="https://i0.wp.com/www.rukamen.com/blog/wp-content/uploads/2019/07/k__112712_shm.jpg?ssl=1"
            style={{ width: 200, height: 100 }}
          />
          <Text>Nomor Sertifikat: {certificateNumber}</Text>
          <Text>Alamat: {address}</Text>
          <Text>Provinsi: {province}</Text>
          <Text>Kota: {city}</Text>
          <Text>Kode Pos: {postalCode}</Text>
        </View>
        <View></View>
      </Page>
    </Document>
  );
}
