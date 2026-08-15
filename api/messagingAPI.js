import api from "../Services/apiConfig";
import { createResourceApi, asArray } from "./resource";

/**
 * Driver <-> dispatch messaging.
 *
 * Conversations are a normal CRUD resource plus a handful of custom actions,
 * so the standard factory covers most of it and the extras are added here
 * rather than hand-rolling a fifth copy of list/get/create.
 *
 * Access is enforced server-side by *participation*, never by role: the API
 * simply will not return a thread you are not in, so nothing here needs to
 * filter for authorisation.
 */
const base = createResourceApi("conversations");

export const conversationAPI = {
  ...base,

  /**
   * Messages in a thread.
   *
   * `since` is an ISO timestamp; passing the newest message's created_at makes
   * the poll return only what has arrived since, rather than the whole thread
   * every few seconds.
   */
  messages: async (id, { since } = {}) => {
    const params = since ? { since } : undefined;
    const response = await api.get(`/conversations/${id}/messages/`, { params });
    return asArray(response.data);
  },

  send: async (id, body) => {
    const response = await api.post(`/conversations/${id}/messages/`, { body });
    return response.data;
  },

  markRead: async (id) => {
    const response = await api.post(`/conversations/${id}/mark-read/`, {});
    return response.data;
  },

  /** Unread total across every thread, for the inbox badge. */
  unreadCount: async () => {
    const response = await api.get("/conversations/unread-count/");
    return response.data?.unread ?? 0;
  },

  /** Open (or reuse) the thread attached to a load. Dispatch-side only. */
  forLoad: async (loadId) => {
    const response = await api.post("/conversations/for-load/", { load: loadId });
    return response.data;
  },
};

export const messageAPI = createResourceApi("messages");
