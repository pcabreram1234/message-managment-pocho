import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AppIconf from "../../assets/logo.png";

/**
 * Genera un PDF con la información de un envío.
 * @param {Object} data - Objeto con la información del envío.
 */
export function generateDeliveryReport(data) {
  const {
    id,
    templateId = "Default",
    updatedAt,
    scheduled_date,
    channel,
    name,
    recipient,
    message_content,
    attachments = [],
    status,
    attempts,
    error_message,
    sender = "PMMS - Pocho`s Messages Managment System",
    generatedAt = new Date().toISOString(),
  } = data;

  const doc = new jsPDF();

  doc.addImage(AppIconf, "PNG", 170, 5, 25, 25, "lOGO", "FAST");

  // Título principal
  doc.setFontSize(16);
  doc.text("Proof of Message Sending", 14, 20);
  doc.setFontSize(10);
  doc.text(`Generation date: ${formatDate(generatedAt)}`, 14, 27);

  let y = 35;

  autoTable(doc, {
    startY: y,
    theme: "grid",
    styles: { fontSize: 10 },
    head: [["Field", "Value"]],
    body: [
      ["Shipping ID", id],
      ["Template used", templateId || "—"],
      ["Shipping date", formatDate(updatedAt) || "—"],
      ["Scheduled date", formatDate(scheduled_date) || "—"],
      ["Channel", channel],
      ["Status", status],
      ["Attempts", attempts],
      ["Error", error_message || "—"],
      ["Sender", sender],
    ],
  });

  y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.text("Addressee", 14, y);
  y += 6;
  autoTable(doc, {
    startY: y,
    theme: "plain",
    styles: { fontSize: 10 },
    body: [
      ["Name:", name],
      ["Email:", recipient],
    ],
  });

  y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.text("Message", 14, y);
  y += 6;
  doc.setFontSize(10);
  const splitMessage = doc.splitTextToSize(message_content, 180);
  doc.text(splitMessage, 14, y);

  y += splitMessage.length * 5 + 10;

  doc.setFontSize(12);
  doc.text("Attachment", 14, y);
  y += 6;

  if (attachments.length === 0) {
    doc.setFontSize(10);
    doc.text("—", 14, y);
  } else {
    attachments.forEach((att, index) => {
      doc.setFontSize(10);
      doc.text(`${index + 1}. ${att}`, 14, y);
      y += 5;
    });
  }

  // Guardar el archivo
  doc.save(`shippment_${id}.pdf`);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
