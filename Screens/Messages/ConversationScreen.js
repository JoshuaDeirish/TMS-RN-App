import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView,
  KeyboardAvoidingView, Platform, StyleSheet,
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import ScreenHeader from "../../Components/ScreenHeader";
import ScreenState from "../../Components/ScreenState";
import { conversationAPI } from "../../api/messagingAPI";
import { useAuth } from "../../Services/Context/AuthContext";
import { formatDateTime } from "../_scaffold/datetime";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import input, { placeholderColour } from "../../styles/input";
import { spacing, radius } from "../../styles/tokens";

/** How often to check for new messages while the thread is open. */
const POLL_MS = 8000;

/**
 * One message thread.
 *
 * Polling, not sockets - matching the backend's transport seam. The server
 * accepts `?since=<iso>` so each poll asks only for what arrived after the
 * newest message already on screen, rather than re-downloading the thread.
 * When a WebSocket transport is added server-side, this screen swaps its
 * timer for a subscription and nothing else changes.
 */
export default function ConversationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const id = route.params?.id;
  const title = route.params?.title || "Conversation";

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  const listRef = useRef(null);
  // Held in a ref, not state: the poll timer closes over it once and must see
  // the latest value without being torn down and rebuilt on every message.
  const newestRef = useRef(null);

  const remember = useCallback((rows) => {
    if (rows.length) newestRef.current = rows[rows.length - 1].created_at;
  }, []);

  const loadAll = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const rows = await conversationAPI.messages(id);
      setMessages(rows);
      remember(rows);
      // Clear the unread badge now the user is actually reading it.
      await conversationAPI.markRead(id).catch(() => {});
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id, remember]);

  const poll = useCallback(async () => {
    if (!newestRef.current) return;
    try {
      const fresh = await conversationAPI.messages(id, { since: newestRef.current });
      if (!fresh.length) return;

      setMessages((prev) => {
        // De-duplicate: a message we just sent can also come back from the poll.
        const seen = new Set(prev.map((m) => m.id));
        return [...prev, ...fresh.filter((m) => !seen.has(m.id))];
      });
      remember(fresh);
      await conversationAPI.markRead(id).catch(() => {});
    } catch {
      // A failed poll is not worth interrupting the user for; the next one
      // will pick the messages up, and a real outage surfaces on send.
    }
  }, [id, remember]);

  useFocusEffect(useCallback(() => { loadAll(); }, [loadAll]));

  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(poll, POLL_MS);
      return () => clearInterval(timer);
    }, [poll])
  );

  useEffect(() => {
    if (messages.length) {
      listRef.current?.scrollToEnd?.({ animated: true });
    }
  }, [messages.length]);

  const send = async () => {
    const body = draft.trim();
    if (!body || sending) return;

    setSending(true);
    setSendError(null);
    try {
      const created = await conversationAPI.send(id, body);
      setDraft("");
      setMessages((prev) =>
        prev.some((m) => m.id === created.id) ? prev : [...prev, created]
      );
      remember([created]);
    } catch (err) {
      setSendError(err?.message || "Could not send that message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title={title}
        backText="Messages"
        onBack={() => navigation.navigate("ConversationList")}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.flex}>
          <ScreenState
            loading={loading}
            error={error}
            onRetry={loadAll}
            empty={messages.length === 0}
            emptyText="No messages yet. Say something."
          >
            <FlatList
              ref={listRef}
              data={messages}
              keyExtractor={(m) => String(m.id)}
              contentContainerStyle={styles.thread}
              renderItem={({ item }) => (
                <MessageBubble message={item} isMine={item.sender === user?.id} />
              )}
            />
          </ScreenState>
        </View>

        {sendError ? (
          <View style={styles.banner}><Text style={styles.bannerText}>{sendError}</Text></View>
        ) : null}

        <View style={styles.composer}>
          <TextInput
            style={[input.inputBare, styles.composerInput]}
            value={draft}
            onChangeText={setDraft}
            placeholder="Write a message…"
            placeholderTextColor={placeholderColour}
            multiline
            onSubmitEditing={send}
          />
          <TouchableOpacity
            style={draft.trim() && !sending ? buttons.primary : buttons.disabled}
            onPress={send}
            disabled={!draft.trim() || sending}
            accessibilityRole="button"
          >
            <Text style={draft.trim() && !sending ? buttons.primaryText : buttons.disabledText}>
              {sending ? "Sending…" : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageBubble({ message, isMine }) {
  if (message.is_system) {
    return (
      <View style={styles.systemRow}>
        <Text style={styles.systemText}>{message.body}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.bubbleRow, isMine && styles.bubbleRowMine]}>
      <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
        {!isMine ? (
          <Text style={styles.sender}>
            {message.sender_name}
            {message.sender_role ? ` · ${message.sender_role}` : ""}
          </Text>
        ) : null}
        <Text style={isMine ? styles.bodyMine : styles.bodyTheirs}>{message.body}</Text>
        <Text style={[styles.time, isMine && styles.timeMine]}>
          {formatDateTime(message.created_at) || ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  thread: {
    padding: spacing.xl,
    rowGap: spacing.md,
  },

  bubbleRow: { flexDirection: "row" },
  bubbleRowMine: { justifyContent: "flex-end" },
  bubble: {
    maxWidth: "78%",
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    rowGap: spacing.xxs,
  },
  bubbleMine: { backgroundColor: colours.accent },
  bubbleTheirs: {
    backgroundColor: colours.surface2,
    borderWidth: 1,
    borderColor: colours.border,
  },
  sender: {
    color: colours.textMuted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  bodyMine: { color: colours.onAccent, fontSize: 15 },
  bodyTheirs: { color: colours.textPrimary, fontSize: 15 },
  time: { color: colours.textMuted, fontSize: 10 },
  timeMine: { color: "rgba(255,255,255,0.75)" },

  systemRow: { alignItems: "center" },
  systemText: {
    color: colours.textMuted,
    fontSize: 12,
    fontStyle: "italic",
    backgroundColor: colours.surface2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },

  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: spacing.md,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colours.border,
    backgroundColor: colours.surface1,
  },
  composerInput: {
    flex: 1,
    maxHeight: 120,
  },
  banner: {
    backgroundColor: colours.dangerSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.danger,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  bannerText: { color: colours.danger },
});
