import { invoiceAPI, documentAPI } from "../api/tmsAPI";
import { ADMIN, ACCOUNTING, loadField } from "./shared";

export default {
  key: "Invoice",
  title: "Invoices",
  singular: "Invoice",
  api: invoiceAPI,
  canCreate: [ADMIN, ACCOUNTING],

  titleOf: (i) => `Invoice #${i.id}`,
  badgeOf: (i) => {
    const tone = { paid: "success", partial: "warning", unpaid: "danger" }[i.payment_status];
    return i.payment_status ? { label: i.payment_status, tone: tone || "default" } : null;
  },

  filters: {
    Unpaid: (i) => i.payment_status === "unpaid",
    Partial: (i) => i.payment_status === "partial",
    Paid: (i) => i.payment_status === "paid",
  },

  listFields: ["amount_due", "payment_status", "issue_date"],

  fields: [
    loadField("load", "Load", { required: true }),
    { name: "amount_due", label: "Amount Due", type: "money", required: true },
    {
      name: "payment_status", label: "Payment Status", type: "choice", required: true,
      options: [
        { value: "unpaid", label: "Unpaid" },
        { value: "partial", label: "Partially Paid" },
        { value: "paid", label: "Paid" },
      ],
    },
    {
      name: "document", label: "Document", type: "fk",
      optionsFrom: { api: documentAPI, label: (d) => d.name },
    },
    { name: "issue_date", label: "Issued", type: "datetime", readOnly: true },
  ],
};
