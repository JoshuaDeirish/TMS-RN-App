import React, { useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import HeaderContainer from "../../Components/HeaderContainer";
import FilterButton from "../../Components/FilterButton";
import ScreenState from "../../Components/ScreenState";
import { notificationAPI } from "../../api/tmsAPI";
import { formatDateTime } from "../_scaffold/datetime";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import { spacing, radius } from "../../styles/tokens";

/**
 * The signed-in user's notifications.
 *
 * Strictly per-user: NotificationLogViewSet filters to request.user for
 * everyone except admins, so there is nothing to scope here.
 *
 * Notifications are currently only *generated* by the messaging layer. The
 * other kinds the model defines - maintenance due, licence expiry, upcoming
 * pickups - need the scheduled checks in a later phase, so this screen will
 * legitimately look quiet until those exist.
 */

const TONES = {
  message: "info",
  assignment: "success",
  maintenance: "warning",
  expiry: "danger",
  deadline: "warning",
};

const FILTERS = {
  All: () => true,
  Unread: (n) => !n.read,
};

export default function NotificationListScreen() {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [working, setWorking] = useState(false);

  const fetch = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setItems(await notificationAPI.listAll());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetch(); }, [fetch]));

  const counts = useMemo(
    () => Object.fromEntries(
      Object.entries(FILTERS).map(([name, fn]) => [name, items.filter(fn).length])
    ),
    [items]
  );

  const visible = items.filter(FILTERS[filter] || FILTERS.All);
  const unread = counts.Unread ?? 0;

  const markAllRead = async () => {
    if (working || !unread) return;
    setWorking(true);
    try {
      await notificationAPI.markAllRead();
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // Non-fatal: refetching restores the true state.
      await fetch();
    } finally {
      setWorking(false);
    }
  };

  const open = (item) => {
    // Deep-link to whatever the notification is about, when it names one.
    if (item.related_conversation) {
      navigation.navigate("Messages", {
        screen: "Conversation",
        params: { id: item.related_conversation, title: item.title },
      });
    } else if (item.related_load) {
      navigation.navigate("Loads", {
        screen: "LoadDetail",
        params: { id: item.related_load },
      });
    }
  };

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer
        title="Notifications"
        rightElement={
          unread ? (
            <TouchableOpacity
              style={working ? buttons.disabled : buttons.secondary}
              onPress={markAllRead}
              disabled={working}
            >
              <Text style={working ? buttons.disabledText : buttons.secondaryText}>
                {working ? "Working…" : `Mark all read (${unread})`}
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <View style={layout.section}>
        {Object.keys(FILTERS).map((name) => (
          <FilterButton
            key={name}
            label={name}
            count={counts[name] ?? 0}
            onPress={() => setFilter(name)}
          />
        ))}
      </View>

      <View style={layout.subContainer}>
        <ScreenState
          loading={loading}
          error={error}
          onRetry={fetch}
          empty={visible.length === 0}
          emptyText={
            items.length === 0 ? "Nothing to catch up on." : "No unread notifications."
          }
        >
          <FlatList
            data={visible}
            keyExtractor={(n) => String(n.id)}
            contentContainerStyle={{ paddingBottom: spacing.xxl }}
            renderItem={({ item }) => {
              const linked = item.related_conversation || item.related_load;
              const body = (
                <View style={[styles.card, !item.read && styles.cardUnread]}>
                  <View style={styles.top}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <View style={[styles.tag, toneStyle(TONES[item.notification_type])]}>
                      <Text style={styles.tagText}>{item.notification_type}</Text>
                    </View>
                  </View>
                  <Text style={styles.message}>{item.message}</Text>
                  <Text style={typography.detail.caption}>
                    {formatDateTime(item.created_at) || ""}
                  </Text>
                </View>
              );

              return linked ? (
                <TouchableOpacity onPress={() => open(item)}>{body}</TouchableOpacity>
              ) : (
                body
              );
            }}
          />
        </ScreenState>
      </View>
    </SafeAreaView>
  );
}

function toneStyle(tone) {
  switch (tone) {
    case "success": return { backgroundColor: colours.successSoft };
    case "warning": return { backgroundColor: colours.warningSoft };
    case "danger": return { backgroundColor: colours.dangerSoft };
    case "info": return { backgroundColor: colours.infoSoft };
    default: return { backgroundColor: colours.surface3 };
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colours.surface1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    rowGap: spacing.xs,
  },
  cardUnread: { borderColor: colours.accent },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: spacing.md,
  },
  title: {
    flexShrink: 1,
    color: colours.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  tagText: {
    color: colours.textSecondary,
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  message: { color: colours.textSecondary, fontSize: 14 },
});
