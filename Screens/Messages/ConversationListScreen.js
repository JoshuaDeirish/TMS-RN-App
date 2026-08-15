import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import HeaderContainer from "../../Components/HeaderContainer";
import SearchBar from "../../Components/SearchBar";
import ScreenState from "../../Components/ScreenState";
import { conversationAPI } from "../../api/messagingAPI";
import { formatDateTime } from "../_scaffold/datetime";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import { spacing, radius } from "../../styles/tokens";

/**
 * The inbox.
 *
 * Every thread here is one the signed-in user participates in - the API
 * decides that by membership, so a driver cannot reach dispatch's other
 * conversations even by guessing an id. Nothing on this screen filters for
 * authorisation; it does not need to.
 */
export default function ConversationListScreen() {
  const navigation = useNavigation();

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetch = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setThreads(await conversationAPI.listAll());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetch(); }, [fetch]));

  const q = query.trim().toLowerCase();
  const visible = q
    ? threads.filter((t) =>
        [t.display_title, t.load_reference, t.last_message?.body]
          .some((f) => f && String(f).toLowerCase().includes(q))
      )
    : threads;

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer title="Messages" />

      <View style={layout.section}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <View style={layout.subContainer}>
        <ScreenState
          loading={loading}
          error={error}
          onRetry={fetch}
          empty={visible.length === 0}
          emptyText={
            threads.length === 0
              ? "No conversations yet. Dispatch starts a thread from a load."
              : "No conversations match that search."
          }
        >
          <FlatList
            data={visible}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: spacing.xxl }}
            renderItem={({ item }) => (
              <ThreadRow
                thread={item}
                onPress={() =>
                  navigation.navigate("Conversation", {
                    id: item.id,
                    title: item.display_title,
                  })
                }
              />
            )}
          />
        </ScreenState>
      </View>
    </SafeAreaView>
  );
}

function ThreadRow({ thread, onPress }) {
  const unread = thread.unread_count > 0;
  const last = thread.last_message;

  return (
    <TouchableOpacity style={[styles.row, unread && styles.rowUnread]} onPress={onPress}>
      <View style={styles.rowTop}>
        <Text style={[styles.title, unread && styles.titleUnread]} numberOfLines={1}>
          {thread.display_title || `Conversation #${thread.id}`}
        </Text>
        {unread ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{thread.unread_count}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.preview} numberOfLines={1}>
        {last
          ? `${last.is_system ? "" : `${last.sender_name}: `}${last.body}`
          : "No messages yet."}
      </Text>

      <Text style={typography.detail.caption}>
        {formatDateTime(thread.last_message_at || thread.created_at) || ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colours.surface1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    rowGap: spacing.xs,
  },
  rowUnread: {
    borderColor: colours.accent,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: spacing.md,
  },
  title: {
    flexShrink: 1,
    color: colours.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  titleUnread: { fontWeight: "700" },
  badge: {
    backgroundColor: colours.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: "center",
  },
  badgeText: {
    color: colours.onAccent,
    fontSize: 11,
    fontWeight: "700",
  },
  preview: {
    color: colours.textSecondary,
    fontSize: 14,
  },
});
