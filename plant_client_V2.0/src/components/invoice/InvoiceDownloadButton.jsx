import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDFDocument from "./InvoicePDFDocument";

const InvoiceDownloadButton = ({ order }) => {
  return (
    <div className="bg-yellow-500 flex items-center p-2 rounded-lg font-semibold hover:bg-yellow-400 cursor-pointer">
      <PDFDownloadLink
        document={<InvoicePDFDocument order={order} />}
        fileName={`invoice-${order?.transactionId || "order"}.pdf`}
      >
        {({ loading }) =>
          loading ? (
            <button disabled>Preparing Invoice...</button>
          ) : (
            <button>Download Invoice</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoiceDownloadButton;
