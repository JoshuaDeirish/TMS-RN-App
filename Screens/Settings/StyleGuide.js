import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import typography from '../../styles/typography';
import colours from '../../styles/colours';
import buttons from '../../styles/buttons';
import input from '../../styles/input';
import Card from '../../Components/Card';
import BoxList from '../../Components/BoxList';
import List from '../../Components/list';
import HeaderContainer from '../../Components/HeaderContainer';
import IconButton from '../../Components/IconButton';
import SearchBar from '../../Components/SearchBar';
import AntDesign from '@expo/vector-icons/AntDesign';
import FilterButton from '../../Components/FilterButton';


export default function StyleGuideScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* TITLE */}
      <View style={styles.section}>
        <Text style={typography.heading.h1}>Style Guide</Text>
      <Text style={typography.detail.label}>Preview of all shared UI components</Text>
      </View>
      

      {/* -------------------- HEADERS -------------------- */}

      <HeaderContainer title="Headers" />
      <HeaderContainer
        title="Headers With Buttons"
        rightElement={
          <IconButton
            text="Add button"
            icon={<AntDesign name="plus" size={20} color="white" />}
            onPress={() => console.log("Added")}
          />
        }
      />


      {/* -------------------- FILTERS -------------------- */}

      <View style={styles.filterContainer}>
        <SearchBar value={""} onChangeText={() => { }} />
        <FilterButton label="Active" count={12} onPress={() => { }} />
        <FilterButton label="Inactive" count={3} onPress={() => { }} />
      </View>

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
        <Text style={typography.detail.status}>Status</Text>
      </View>

      {/* -------------------- BUTTONS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>

        <TouchableOpacity style={buttons.primary}>
          <Text style={buttons.primaryText}>Primary Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttons.secondary}>
          <Text style={buttons.secondaryText}>Secondary Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttons.danger}>
          <Text style={buttons.dangerText}>Danger Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttons.outline}>
          <Text style={buttons.outlineText}>Outline Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttons.disabled} disabled>
          <Text style={buttons.disabledText}>Disabled Button</Text>
        </TouchableOpacity>
      </View>

      {/* -------------------- INPUTS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inputs</Text>

        <TextInput style={input.input} placeholder="Regular Input" />
        <TextInput style={input.input} placeholder="With Label" label="Vehicle ID" />
        <TextInput style={input.input} placeholder="Password" label="Vehicle ID" secureTextEntry />
        <TextInput style={input.inputDisabled} placeholder="Disabled" disabled />
      </View>
      {/* -------------------- LISTS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lists</Text>

        {/* ==== BOX LIST PREVIEW ==== */}
        <Text style={typography.detail.label}>Box List (2-column cards)</Text>

        <BoxList
          data={[
            { vehicleId: "1", licencePlateNum: "ABC123", model: "Ford F150", year: "2020" },
            { vehicleId: "2", licencePlateNum: "XYZ789", model: "Ram 3500", year: "2021" },
          ]}
          fields={[
            { key: "licencePlateNum", label: "Plate" },
            { key: "model", label: "Model" },
            { key: "year", label: "Year" },
          ]}
          image={require("../../assets/default-vehicle.jpeg")}
          onItemPress={() => { }}
        />

        {/* ==== REGULAR LIST PREVIEW ==== */}
        <Text style={[typography.detail.label, { marginTop: 20 }]}>
          Regular List (table-style)
        </Text>

        <List
          columns={["Plate", "Model", "Year"]}
          data={[
            { id: "1", plate: "ABC123", model: "F150", year: "2020" },
            { id: "2", plate: "XYZ789", model: "Ram 3500", year: "2021" },
          ]}
          onItemPress={() => { }}
        />
      </View>
      {/* -------------------- CARDS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cards</Text>

        {/* Text Left, Image Right */}
        <Card
          variant="textLeftImageRight"
          image={{ uri: "https://picsum.photos/100" }}
        >
          <Text style={typography.heading.h4}>Text Left / Image Right</Text>
          <Text style={typography.text.body}>Good for promos or features.</Text>
        </Card>
        {/* Default */}
        <Card variant="horizontal">
          <Text style={typography.heading.h4}>Horizontal Layout</Text>
          <Text style={typography.text.body}>Side-by-side content.</Text>
        </Card>
        <Card>
          <Text style={typography.heading.h4}>Default Card</Text>
          <Text style={typography.text.body}>This is a simple default card.</Text>
        </Card>

        {/* Elevated */}
        <Card variant="elevated">
          <Text style={typography.heading.h4}>Elevated Card</Text>
          <Text style={typography.text.body}>Shadow for emphasis.</Text>
        </Card>

        {/* Warning */}
        <Card variant="warning">
          <Text style={typography.heading.h4}>Warning Card</Text>
          <Text style={typography.text.body}>Great for alerts.</Text>
        </Card>

        {/* Horizontal Layout */}
        <Card variant="horizontal">
          <Text style={typography.heading.h4}>Horizontal Layout</Text>
          <Text style={typography.text.body}>Side-by-side content.</Text>
        </Card>


      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
  },
  section: {
    marginTop: 30,
    padding: 20,
    borderBottomWidth: 1,

  },
  sectionTitle: {
    ...typography.heading.h3,

  },
  filterContainer: { 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingTop: 30, 
    paddingBottom: 30, 
    borderBottomColor: 
    colours.border, 
    borderBottomWidth: 1, 
    backgroundColor: 
    colours.headerBackground, 
    flexDirection: 'row', 
    alignItems: 'center', 
    columnGap: 5, },
});
