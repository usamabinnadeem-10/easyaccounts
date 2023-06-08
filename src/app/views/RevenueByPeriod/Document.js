import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

export const RevenueDocument = ({ data }) => (
  <Document
    title="Sale Ledger"
    creator="Easy Accounts"
    producer="Easy Accounts"
    author="Easy Accounts"
  >
    <Page size="A4" style={styles.body}>
      <Text style={styles.header} fixed>
        Sale Ledger
      </Text>
      <Text style={styles.text} fixed>
        lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem
        impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum
        lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem
        impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum
        lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem
        impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum
        lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem
        impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum
        lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem
        impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum
        lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem
        impsum
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    padding: 16,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
