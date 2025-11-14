import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardListScreen() {
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* TITLE */}
      <Text style={typography.heading.h1}>Style Guide</Text>
      <Text style={typography.detail.label}>Preview of all shared UI components</Text>

      {/* -------------------- TYPOGRAPHY -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>

        <Text style={typography.heading.h1}>Heading H1</Text>
        <Text style={typography.heading.h2}>Heading H2</Text>
        <Text style={typography.heading.h3}>Heading H3</Text>
        <Text style={typography.heading.h4}>Heading H4</Text>

        <Text style={typography.text.body}>Body Text</Text>
        <Text style={typography.text.muted}>Muted / Secondary Text</Text>
        <Text style={typography.detail.label}>Label / Small</Text>
        <Text style={typography.detail.caption}>Caption</Text>
      </View>

      {/* -------------------- BUTTONS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>

        <Button label="Primary Button" variant="primary" />
        <Button label="Secondary Button" variant="secondary" />
        <Button label="Outline Button" variant="outline" />
        <Button label="Danger Button" variant="danger" />
        <Button label="Disabled Button" disabled />
      </View>

      {/* -------------------- INPUTS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inputs</Text>

        <Input placeholder="Regular Input" />
        <Input placeholder="With Label" label="Vehicle ID" />
        <Input placeholder="Disabled" disabled />
      </View>

      {/* -------------------- CARDS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cards</Text>

        <Card>
          <Text style={typography.heading.h4}>Default Card</Text>
          <Text style={typography.text.body}>This is a simple card.</Text>
        </Card>

        <Card variant="elevated">
          <Text style={typography.heading.h4}>Elevated Card</Text>
          <Text style={typography.text.body}>Shadow variant.</Text>
        </Card>

        <Card variant="warning">
          <Text style={typography.heading.h4}>Warning Card</Text>
          <Text style={typography.text.body}>Used to show warnings.</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});