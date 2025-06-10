import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Stylesheet
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#000",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titleBlock: {
    fontSize: 18,
    fontWeight: "bold",
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 12,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontWeight: "bold",
  },
  billTo: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 4,
    fontWeight: "bold",
    backgroundColor: "#E0E0E0",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
  },
  colDesc: { width: "40%" },
  colQty: { width: "20%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },
  totals: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalLabel: {
    width: "80%",
    textAlign: "right",
    paddingRight: 8,
  },
  totalValue: {
    width: "20%",
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  addressBlock: {
    width: "48%",
  },
});

const InvoicePDFDocument = ({ order }) => {
  const {
    createdAt,
    orderInfo,
    plantIdWithQuantity,
    transactionId,
    paymentStatus,
    paidAmount,
    orderStatus,
  } = order || {};

  const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString("en-US");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.titleBlock}>INVOICE</Text>
            <Text>Invoice #{transactionId || "N/A"}</Text>
          </View>
          <View style={styles.companyInfo}>
            <Text> Plant World</Text>
            <Text>515 Street Lane</Text>
            <Text> Dhaka City, Banani 54321</Text>
          </View>
        </View>

        {/* Bill To and Ship To - Side by Side */}
        <View style={[styles.section, styles.flexRow]}>
          {/* Bill To */}
          <View style={styles.addressBlock}>
            <Text style={styles.label}>Bill To:</Text>
            <View style={styles.billTo}>
              <Text>{orderInfo?.billerName}</Text>
              <Text>{orderInfo?.shippingAddress}</Text>
              <Text>{orderInfo?.billerZipCode}</Text>
              <Text>{orderInfo?.billerEmail}</Text>
              <Text>{orderInfo?.billerPhone}</Text>
            </View>
            <Text>Date: {formatDate(createdAt)}</Text>
            <Text>Payment Status: ({orderInfo?.paymentStatus})</Text>
          </View>

          {/* Ship To */}
          <View style={styles.addressBlock}>
            <Text style={styles.label}>Ship To:</Text>
            <View style={styles.billTo}>
              <Text>{orderInfo?.receiverName}</Text>
              <Text>{orderInfo?.shippingAddress}</Text>
              <Text>{orderInfo?.receiverZipCode}</Text>
              <Text>{orderInfo?.receiverEmail}</Text>
              <Text>{orderInfo?.receiverPhone}</Text>
            </View>
            <Text>Date: {formatDate(createdAt)}</Text>
            <Text>Payment Status: ({orderInfo?.paymentStatus})</Text>
          </View>
        </View>

        {/* Item Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Quantity</Text>
            <Text style={styles.colPrice}>Unit Price</Text>
            <Text style={styles.colTotal}>Total</Text>
          </View>
          {plantIdWithQuantity?.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.colDesc}>
                {item?.plantId?.name || "Item"}
              </Text>
              <Text style={styles.colQty}>{item?.quantity}</Text>
              <Text style={styles.colPrice}>
                ${Number(item.plantId?.newPrice || 0).toFixed(2)}
              </Text>
              <Text style={styles.colTotal}>
                $
                {(
                  Number(item?.plantId?.newPrice || 0) * item?.quantity
                ).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>
              ${orderInfo?.totalPrice?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>Shipping Discount($4)</Text>
            <Text style={styles.totalValue}>
              ${orderInfo?.shippingDiscount?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={[styles.totalLabel, styles.bold]}>Total</Text>
            <Text style={[styles.totalValue, styles.bold]}>
              ${orderInfo?.totalPriceAfterDiscount?.toFixed(2)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDFDocument;
