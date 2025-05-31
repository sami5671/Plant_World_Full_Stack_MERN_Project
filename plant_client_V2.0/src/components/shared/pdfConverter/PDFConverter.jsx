import { useState } from "react";
import jsPDF from "jspdf";

const PDFConverter = ({ orders }) => {
  //   console.log(orders);
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    setLoader(true);

    const doc = new jsPDF();
    const order = orders[0]; // generate for the first order — or loop if needed

    if (!order) return;

    const {
      transactionId,
      createdAt,
      orderStatus,
      paymentStatus,
      paidAmount,
      orderInfo,
      plantIdWithQuantity,
    } = order;

    // Set styles
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Order summary
    doc.text("Order Summary", 105, 10, { align: "center" });
    doc.text(`Transaction ID: ${transactionId}`, 20, 20);
    doc.text(`Order Date: ${new Date(createdAt).toLocaleString()}`, 20, 30);
    doc.text(`Status: ${orderInfo?.orderStatus}`, 20, 40);
    doc.text(`Payment Status: ${orderInfo?.paymentStatus}`, 20, 50);
    doc.text(`Paid Amount: $${orderInfo?.paidAmount}`, 20, 60);

    // Billing info
    doc.text("Biller Information", 20, 75);
    doc.text(`Name: ${orderInfo?.billerName}`, 20, 85);
    doc.text(`Email: ${orderInfo?.billerEmail}`, 20, 95);
    doc.text(`Phone: ${orderInfo?.billerPhone}`, 20, 105);
    doc.text(`Zip Code: ${orderInfo?.billerZipCode}`, 20, 115);

    // Receiver info
    doc.text("Receiver Information", 20, 130);
    doc.text(`Name: ${orderInfo?.receiverName}`, 20, 140);
    doc.text(`Email: ${orderInfo?.receiverEmail}`, 20, 150);
    doc.text(`Phone: ${orderInfo?.receiverPhone}`, 20, 160);
    doc.text(`Zip Code: ${orderInfo?.receiverZipCode}`, 20, 170);
    doc.text(`Address: ${orderInfo?.shippingAddress}`, 20, 180);

    // Plants info
    doc.text("Ordered Plants", 20, 195);
    let y = 205;

    plantIdWithQuantity?.forEach((item, index) => {
      const plant = item.plantId;
      doc.text(`${index + 1}. ${plant.name}`, 20, y);
      doc.text(`  Category: ${plant.category}`, 25, y + 10);
      doc.text(`  Type: ${plant.plantType}`, 25, y + 20);
      doc.text(`  Color: ${plant.color}`, 25, y + 30);
      doc.text(`  Material: ${plant.material}`, 25, y + 40);
      doc.text(`  Price: $${plant.newPrice}`, 25, y + 50);
      doc.text(`  Quantity: ${item.quantity}`, 25, y + 60);
      y += 70; // space for next plant
    });

    // Save
    doc.save(`order-${transactionId}.pdf`);
    setLoader(false);
  };

  return (
    <div>
      <button
        className="bg-yellow-400 text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-500 transition"
        onClick={downloadPDF}
        disabled={loader}
      >
        {loader ? "Downloading..." : "Get Invoice"}
      </button>
    </div>
  );
};

export default PDFConverter;
