import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import base64 from "../../assets/images/base";

// Styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 30, position: "relative" },
  header: { position: "absolute", top: 10, right: 10, width: 80, height: 80 },
  section: { marginBottom: 15 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  total: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
});

const RendezVousPDF = ({ data }) => {
  if (!data) return null;

  const { patient, salle, dateHeure, prestations } = data;
  const totalTarif =
    prestations?.reduce((sum, prestation) => sum + prestation.tarif, 0) || 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={base64} style={styles.header} />
        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.title}>Confirmation de Rendez-Vous</Text>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.text}>
            Patient: {patient?.nom} {patient?.prenom}
          </Text>
          <Text style={styles.text}>Email: {patient?.email}</Text>
          <Text style={styles.text}>Telephone: {patient?.telephone}</Text>
        </View>

        <View style={styles.separator} />

        {/* Salle Information */}
        <View style={styles.section}>
          <Text style={styles.text}>Salle: {salle?.name}</Text>
          <Text style={styles.text}>Localisation: {salle?.location}</Text>
        </View>

        <View style={styles.separator} />

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={styles.text}>
            Date & Heure: {new Date(dateHeure).toLocaleString("fr-FR")}
          </Text>
        </View>

        <View style={styles.separator} />

        {/* Prestations */}
        <View style={styles.section}>
          <Text style={styles.title}>Prestations :</Text>
          {prestations?.length > 0 ? (
            prestations.map((prestation, index) => (
              <Text key={index} style={styles.text}>
                - {prestation.nom} ({prestation.type}) : {prestation.tarif}€
              </Text>
            ))
          ) : (
            <Text style={styles.text}>Aucune prestation sélectionnée.</Text>
          )}
          {/* Display total tarif */}
          {prestations?.length > 0 && (
            <Text style={styles.total}>Total: {totalTarif.toFixed(2)}€</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default RendezVousPDF;
