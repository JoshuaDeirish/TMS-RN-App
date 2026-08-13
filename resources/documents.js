import { documentAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, SAFETY, HR, MANAGER, ACCOUNTING, driverField, vehicleField, loadField } from "./shared";

/**
 * Documents.
 *
 * NOTE: the `file` itself is read-only here. Uploading needs a multipart
 * request and a file picker, which the scaffold does not do - so this screen
 * manages document *metadata* and links, and the file is shown but not
 * replaceable. Marked read-only rather than omitted so it is visible that the
 * field exists and is not yet wired, instead of appearing to work and
 * silently discarding the upload.
 *
 * Generated documents (border paperwork, BOLs) are Phase 9; this is the
 * uploaded-file side only.
 */
export default {
  key: "Document",
  title: "Documents",
  singular: "Document",
  api: documentAPI,
  canCreate: [ADMIN, DISPATCHER, SAFETY, HR, MANAGER, ACCOUNTING],

  titleOf: (d) => d.name,
  subtitleOf: (d) => d.type_display || d.document_type || "",
  badgeOf: (d) => (d.document_type ? { label: d.document_type, tone: "info" } : null),

  filters: {
    Invoices: (d) => d.document_type === "invoice",
    Contracts: (d) => d.document_type === "contract",
    MTO: (d) => d.document_type === "mto",
  },

  listFields: ["document_type", "uploaded_at"],
  searchExtra: ["related_vehicle_plate", "related_driver_name", "related_load_reference"],

  sections: [
    { key: "doc", label: "Document", fields: ["name", "document_type", "file"] },
    {
      key: "links", label: "Related To",
      description: "Attach the document to the record it concerns.",
      fields: ["related_load", "related_vehicle", "related_driver"],
    },
  ],

  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "document_type", label: "Type", type: "choice", required: true,
      options: [
        { value: "mto", label: "MTO Required" },
        { value: "invoice", label: "Invoice" },
        { value: "contract", label: "Contract" },
        { value: "receipt", label: "Receipt" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "file", label: "File", type: "text", readOnly: true,
      help: "File upload is not yet available in the app; upload via the Django admin for now.",
    },
    loadField("related_load", "Related Load"),
    vehicleField("related_vehicle", "Related Vehicle"),
    driverField("related_driver", "Related Driver"),
    { name: "uploaded_at", label: "Uploaded", type: "datetime", readOnly: true },
  ],
};
