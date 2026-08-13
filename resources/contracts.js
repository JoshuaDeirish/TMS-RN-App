import { contractAPI, documentAPI } from "../api/tmsAPI";
import { ADMIN, MANAGER, ACCOUNTING, clientField } from "./shared";

export default {
  key: "Contract",
  title: "Contracts",
  singular: "Contract",
  api: contractAPI,
  canCreate: [ADMIN, MANAGER, ACCOUNTING],

  titleOf: (c) => c.client_name || `Contract #${c.id}`,
  badgeOf: (c) => {
    if (!c.end_date) return null;
    const ended = String(c.end_date).slice(0, 10) < new Date().toISOString().slice(0, 10);
    return ended ? { label: "Expired", tone: "danger" } : { label: "Active", tone: "success" };
  },

  listFields: ["start_date", "end_date"],

  fields: [
    clientField("client", "Client", { required: true }),
    { name: "start_date", label: "Start Date", type: "date", required: true },
    { name: "end_date", label: "End Date", type: "date", required: true },
    { name: "terms", label: "Terms", type: "textarea", required: true },
    {
      name: "document", label: "Document", type: "fk",
      optionsFrom: { api: documentAPI, label: (d) => d.name },
    },
  ],
};
