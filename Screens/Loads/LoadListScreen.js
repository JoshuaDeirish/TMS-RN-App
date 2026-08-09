import React, { useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import HeaderContainer from "../../Components/HeaderContainer";
import IconButton from "../../Components/IconButton";
import FilterButton from "../../Components/FilterButton";
import SearchBar from "../../Components/SearchBar";
import ScreenState from "../../Components/ScreenState";
import { loadAPI, asArray } from "../../api/tmsAPI";
import { useAuth } from "../../Services/Context/AuthContext";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";

const CAN_CREATE = ["admin", "dispatcher", "manager"];

const FILTERS = {
  All: () => true,
  Unassigned: (l) => !l.assigned_vehicle,
  Assigned: (l) => Boolean(l.assigned_vehicle),
  Delivered: (l) => Boolean(l.delivered_at),
};

const money = (v) => (v == null || v === "" ? "—" : `$${Number(v).toLocaleString()}`);

const shortDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

function LoadRow({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardTop}>
        <Text style={styles.reference}>{item.reference || `Load #${item.id}`}</Text>
        <View style={[styles.badge, item.assigned_vehicle ? styles.badgeAssigned : styles.badgeUnassigned]}>
          <Text style={styles.badgeText}>
            {item.assigned_vehicle ? item.vehicle_plate || "Assigned" : "Unassigned"}
          </Text>
        </View>
      </View>

      <Text style={styles.route} numberOfLines={1}>
        {item.origin_display || "—"}  →  {item.destination_display || "—"}
      </Text>

      <View style={styles.metaRow}>
        <Meta label="Client" value={item.client_name || "—"} />
        <Meta label="Rate" value={money(item.rate)} />
        <Meta label="Pickup" value={shortDate(item.pickup_time)} />
        <Meta label="Delivery" value={shortDate(item.expected_delivery)} />
      </View>
    </TouchableOpacity>
  );
}

function Meta({ label, value }) {
  return (
    <View style={styles.meta}>
      <Text style={typography.detail.label}>{label}</Text>
      <Text style={styles.metaValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

export default function LoadListScreen() {
  const navigation = useNavigation();
  const { role } = useAuth();

  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setLoads(asArray(await loadAPI.list()));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch on focus so returning from Add/Edit shows the change immediately.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const counts = useMemo(
    () => Object.fromEntries(
      Object.entries(FILTERS).map(([name, fn]) => [name, loads.filter(fn).length])
    ),
    [loads]
  );

  const visible = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return loads.filter(FILTERS[activeFilter]).filter((l) => {
      if (!q) return true;
      return [l.reference, l.client_name, l.origin_display, l.destination_display, l.commodity, l.vehicle_plate]
        .some((f) => f && String(f).toLowerCase().includes(q));
    });
  }, [loads, activeFilter, searchQuery]);

  const canCreate = CAN_CREATE.includes(role);

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer
        title="Loads"
        rightElement={
          canCreate ? (
            <IconButton
              text="Add Load"
              icon={<AntDesign name="plus" size={20} color="white" />}
              onPress={() => navigation.navigate("LoadAdd")}
            />
          ) : null
        }
      />

      <View style={layout.section}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        {Object.keys(FILTERS).map((name) => (
          <FilterButton
            key={name}
            label={name}
            count={counts[name] ?? 0}
            onPress={() => setActiveFilter(name)}
          />
        ))}
      </View>

      <View style={layout.subContainer}>
        <ScreenState
          loading={loading}
          error={error}
          onRetry={load}
          empty={visible.length === 0}
          emptyText={
            loads.length === 0
              ? "No loads yet. Create one to get started."
              : "No loads match this filter."
          }
        >
          <FlatList
            data={visible}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <LoadRow
                item={item}
                onPress={() => navigation.navigate("LoadDetail", { id: item.id })}
              />
            )}
          />
        </ScreenState>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colours.surface1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colours.border,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reference: { color: colours.textPrimary, fontSize: 16, fontWeight: "700" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeAssigned: { backgroundColor: colours.success },
  badgeUnassigned: { backgroundColor: colours.warning },
  badgeText: { color: "#0d0d0d", fontSize: 11, fontWeight: "700" },
  route: { color: colours.textSecondary, fontSize: 14, marginBottom: 12 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 24, rowGap: 8 },
  meta: { minWidth: 110 },
  metaValue: { color: colours.textPrimary, fontSize: 14, fontWeight: "600" },
});
