import React, { useState, useCallback, useMemo } from "react";
import {
  View, Text, FlatList, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet,
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import HeaderContainer from "../../Components/HeaderContainer";
import ScreenHeader from "../../Components/ScreenHeader";
import IconButton from "../../Components/IconButton";
import FilterButton from "../../Components/FilterButton";
import SearchBar from "../../Components/SearchBar";
import ScreenState from "../../Components/ScreenState";
import DetailsList from "../../Components/DetailsList";
import ConfirmDialog from "../../Components/ConfirmDialog";
import ResourceForm from "./ResourceForm";
import { emptyForm, toFormState, buildPayload, displayValue, searchableText } from "./fields";
import { useAuth } from "../../Services/Context/AuthContext";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import { spacing, radius } from "../../styles/tokens";

/**
 * Builds the List / Details / Add / Edit screens for one resource from a
 * declarative config.
 *
 * Nineteen domains need the same four screens with the same loading, error,
 * empty, search, filter, permission and validation behaviour. Written by hand
 * that is ~76 files which immediately start drifting - one forgets its empty
 * state, another its role check, a third formats dates differently. Here the
 * behaviour exists once and each domain supplies only what is genuinely
 * different: its fields, its labels, and who may write to it.
 *
 * A domain that outgrows the config replaces any one of the four with a
 * hand-written screen; the stack file changes, nothing else does. Loads is
 * exactly that case and stays hand-written.
 *
 * Config
 * ------
 *   key          'Client' - drives route names (ClientList, ClientDetail, ...)
 *   title        'Clients' - list screen heading
 *   singular     'Client'  - used in buttons and confirmations
 *   api          a createResourceApi() client
 *   fields       field definitions; see ./fields.js
 *   sections     optional form tabs: [{ key, label, fields: [names] }]
 *   listFields   field names shown on each list card (default: first four)
 *   titleOf      (record) => string shown as the card/detail title
 *   badgeOf      (record) => { label, tone } | null
 *   filters      { Label: (record) => boolean }
 *   canCreate / canEdit / canDelete
 *                arrays of role strings, mirroring the backend's write_roles
 */
export function createResourceScreens(config) {
  const routes = {
    list: `${config.key}List`,
    detail: `${config.key}Detail`,
    add: `${config.key}Add`,
    edit: `${config.key}Edit`,
  };

  const singular = config.singular || config.key;
  const titleOf = config.titleOf || ((r) => r?.name || `${singular} #${r?.id}`);

  const listFields = config.listFields
    ? config.listFields.map((n) => config.fields.find((f) => f.name === n)).filter(Boolean)
    : config.fields.filter((f) => !["textarea"].includes(f.type)).slice(0, 4);

  const detailFields = config.detailFields
    ? config.detailFields.map((n) => config.fields.find((f) => f.name === n)).filter(Boolean)
    : config.fields;

  // --- Shared helpers -------------------------------------------------------

  /** DRF returns {field: ["msg"]} on a 400; show those against the fields. */
  const applyServerErrors = (err, setFieldErrors) => {
    const data = err?.fieldErrors;
    if (data && typeof data === "object" && !Array.isArray(data)) {
      setFieldErrors(
        Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(" ") : String(v)])
        )
      );
      return true;
    }
    return false;
  };

  const allows = (roles, role) => !roles || roles.length === 0 || roles.includes(role);

  // --- List -----------------------------------------------------------------

  function ListScreen() {
    const navigation = useNavigation();
    const { role } = useAuth();

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");

    const filters = useMemo(
      () => ({ All: () => true, ...(config.filters || {}) }),
      []
    );

    const fetch = useCallback(async () => {
      setError(null);
      setLoading(true);
      try {
        setRecords(await config.api.listAll());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, []);

    // Refetch on focus so returning from Add/Edit shows the change at once.
    useFocusEffect(useCallback(() => { fetch(); }, [fetch]));

    const counts = useMemo(
      () => Object.fromEntries(
        Object.entries(filters).map(([name, fn]) => [name, records.filter(fn).length])
      ),
      [records, filters]
    );

    const visible = useMemo(() => {
      const q = query.trim().toLowerCase();
      const active = filters[filter] || filters.All;
      return records.filter(active).filter((r) => {
        if (!q) return true;
        return searchableText(r, config.fields, config.searchExtra).includes(q);
      });
    }, [records, filter, query, filters]);

    const canCreate = allows(config.canCreate, role);

    return (
      <SafeAreaView style={layout.container}>
        <HeaderContainer
          title={config.title}
          rightElement={
            canCreate ? (
              <IconButton
                text={`Add ${singular}`}
                icon={<AntDesign name="plus" size={20} color={colours.onAccent} />}
                onPress={() => navigation.navigate(routes.add)}
              />
            ) : null
          }
        />

        <View style={layout.section}>
          <SearchBar value={query} onChangeText={setQuery} />
          {Object.keys(filters).map((name) => (
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
              records.length === 0
                ? `No ${config.title.toLowerCase()} yet.${canCreate ? " Create one to get started." : ""}`
                : `No ${config.title.toLowerCase()} match this filter.`
            }
          >
            <FlatList
              data={visible}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={{ paddingBottom: spacing.xxl }}
              renderItem={({ item }) => (
                <ResourceCard
                  item={item}
                  onPress={() => navigation.navigate(routes.detail, { id: item.id })}
                />
              )}
            />
          </ScreenState>
        </View>
      </SafeAreaView>
    );
  }

  function ResourceCard({ item, onPress }) {
    const badge = config.badgeOf ? config.badgeOf(item) : null;

    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle} numberOfLines={1}>{titleOf(item)}</Text>
          {badge ? (
            <View style={[styles.badge, toneStyle(badge.tone)]}>
              <Text style={styles.badgeText}>{badge.label}</Text>
            </View>
          ) : null}
        </View>

        {config.subtitleOf ? (
          <Text style={styles.cardSubtitle} numberOfLines={1}>{config.subtitleOf(item)}</Text>
        ) : null}

        <View style={styles.metaRow}>
          {listFields.map((field) => (
            <View key={field.name} style={styles.meta}>
              <Text style={typography.detail.label}>{field.label}</Text>
              <Text style={styles.metaValue} numberOfLines={1}>
                {displayValue(field, item) ?? "—"}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  }

  // --- Details --------------------------------------------------------------

  function DetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { role } = useAuth();
    const id = route.params?.id ?? route.params?.item?.id;

    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [actionError, setActionError] = useState(null);

    const fetch = useCallback(async () => {
      setError(null);
      setLoading(true);
      try {
        setRecord(await config.api.get(id));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, [id]);

    useFocusEffect(useCallback(() => {
      if (id) fetch();
      else {
        setError({ message: `No ${singular.toLowerCase()} was specified.` });
        setLoading(false);
      }
    }, [id, fetch]));

    const handleDelete = async () => {
      setDeleting(true);
      setActionError(null);
      try {
        await config.api.remove(id);
        setConfirming(false);
        navigation.navigate(routes.list);
      } catch (err) {
        setActionError(err?.message || `Could not delete this ${singular.toLowerCase()}.`);
        setConfirming(false);
      } finally {
        setDeleting(false);
      }
    };

    const canEdit = allows(config.canEdit ?? config.canCreate, role);
    const canDelete = allows(config.canDelete ?? config.canCreate, role);

    return (
      <SafeAreaView style={layout.container}>
        <ScreenHeader
          title={record ? titleOf(record) : singular}
          backText={config.title}
          onBack={() => navigation.navigate(routes.list)}
          actions={
            record ? (
              <View style={styles.headerActions}>
                {canEdit ? (
                  <TouchableOpacity
                    style={buttons.secondary}
                    onPress={() => navigation.navigate(routes.edit, { id })}
                  >
                    <Text style={buttons.secondaryText}>Edit</Text>
                  </TouchableOpacity>
                ) : null}
                {canDelete ? (
                  <TouchableOpacity
                    style={buttons.dangerQuiet}
                    onPress={() => setConfirming(true)}
                  >
                    <Text style={buttons.dangerQuietText}>Delete</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null
          }
        />

        {actionError ? (
          <View style={styles.banner}><Text style={styles.bannerText}>{actionError}</Text></View>
        ) : null}

        <ScreenState loading={loading} error={error} onRetry={fetch}>
          <ScrollView contentContainerStyle={styles.detailScroll}>
            <View style={styles.detailPanel}>
              <DetailsList
                data={detailFields.map((field) => ({
                  label: field.label,
                  value: displayValue(field, record) ?? "—",
                }))}
              />
            </View>
          </ScrollView>
        </ScreenState>

        <ConfirmDialog
          visible={confirming}
          title={`Delete this ${singular.toLowerCase()}?`}
          message={
            record
              ? `${titleOf(record)} will be permanently removed. This cannot be undone.`
              : undefined
          }
          confirmLabel="Delete"
          destructive
          busy={deleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirming(false)}
        />
      </SafeAreaView>
    );
  }

  // --- Add ------------------------------------------------------------------

  function AddScreen() {
    const navigation = useNavigation();

    const [form, setForm] = useState(() => ({
      ...emptyForm(config.fields),
      ...(config.defaults || {}),
    }));
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
      if (saving) return;
      setSubmitError(null);

      const { payload, errors } = buildPayload(config.fields, form);
      if (errors) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
      setSaving(true);

      try {
        const created = await config.api.create(payload);
        navigation.navigate(routes.detail, { id: created.id });
      } catch (err) {
        applyServerErrors(err, setFieldErrors);
        setSubmitError(err?.message || `Could not create the ${singular.toLowerCase()}.`);
      } finally {
        setSaving(false);
      }
    };

    return (
      <SafeAreaView style={layout.container}>
        <ScreenHeader
          title={`Add ${singular}`}
          backText={config.title}
          onBack={() => navigation.navigate(routes.list)}
          onSave={handleSave}
          saving={saving}
        />
        {submitError ? (
          <View style={styles.banner}><Text style={styles.bannerText}>{submitError}</Text></View>
        ) : null}
        <ResourceForm config={config} form={form} setForm={setForm} fieldErrors={fieldErrors} />
      </SafeAreaView>
    );
  }

  // --- Edit -----------------------------------------------------------------

  function EditScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id ?? route.params?.item?.id;

    const [form, setForm] = useState(() => emptyForm(config.fields));
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetch = useCallback(async () => {
      setLoadError(null);
      setLoading(true);
      try {
        setForm(toFormState(config.fields, await config.api.get(id)));
      } catch (err) {
        setLoadError(err);
      } finally {
        setLoading(false);
      }
    }, [id]);

    React.useEffect(() => {
      if (id) fetch();
      else {
        setLoadError({ message: `No ${singular.toLowerCase()} was specified.` });
        setLoading(false);
      }
    }, [id, fetch]);

    const handleSave = async () => {
      if (saving) return;
      setSubmitError(null);

      const { payload, errors } = buildPayload(config.fields, form);
      if (errors) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
      setSaving(true);

      try {
        // PATCH, not PUT: send only what the form owns, so fields the
        // serializer exposes read-only are never echoed back as writes.
        await config.api.patch(id, payload);
        navigation.navigate(routes.detail, { id });
      } catch (err) {
        applyServerErrors(err, setFieldErrors);
        setSubmitError(err?.message || `Could not save the ${singular.toLowerCase()}.`);
      } finally {
        setSaving(false);
      }
    };

    return (
      <SafeAreaView style={layout.container}>
        <ScreenHeader
          title={`Edit ${singular}`}
          backText={singular}
          onBack={() => navigation.navigate(routes.detail, { id })}
          onSave={handleSave}
          saving={saving}
        />
        {submitError ? (
          <View style={styles.banner}><Text style={styles.bannerText}>{submitError}</Text></View>
        ) : null}
        <ScreenState loading={loading} error={loadError} onRetry={fetch}>
          <ResourceForm config={config} form={form} setForm={setForm} fieldErrors={fieldErrors} />
        </ScreenState>
      </SafeAreaView>
    );
  }

  return { ListScreen, DetailsScreen, AddScreen, EditScreen, routes };
}

// --- Shared presentation ----------------------------------------------------

function toneStyle(tone) {
  switch (tone) {
    case "success": return { backgroundColor: colours.success };
    case "warning": return { backgroundColor: colours.warning };
    case "danger": return { backgroundColor: colours.danger };
    case "info": return { backgroundColor: colours.info };
    default: return { backgroundColor: colours.surface3 };
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colours.surface1,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colours.border,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    flexShrink: 1,
    color: colours.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    color: colours.textSecondary,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgeText: {
    color: colours.onStatus,
    fontSize: 11,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: spacing.xxl,
    rowGap: spacing.sm,
  },
  meta: { minWidth: 110 },
  metaValue: {
    color: colours.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },

  headerActions: {
    flexDirection: "row",
    columnGap: spacing.md,
  },
  detailScroll: {
    padding: spacing.xxl,
  },
  detailPanel: {
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.sm,
  },
  banner: {
    backgroundColor: colours.dangerSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.danger,
    padding: spacing.md,
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    borderRadius: radius.sm,
  },
  bannerText: { color: colours.danger },
});

export default createResourceScreens;
