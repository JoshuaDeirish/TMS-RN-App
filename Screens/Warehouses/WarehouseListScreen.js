import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import List from '../../Components/list';
import layout from '../../styles/layout';
import HeaderContainer from '../../Components/HeaderContainer';
import IconButton from '../../Components/IconButton';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FilterButton from '../../Components/FilterButton';
import SearchBar from '../../Components/SearchBar';

export default function WarehouseListScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={layout.containerTwo}>
      <HeaderContainer title="Warehouses" rightElement={<IconButton
        text="Add Warehouse"
        icon={<AntDesign name="plus" size={20} color="white" />}
        onPress={() => navigation.navigate("WarehouseAdd")}
      />} />
      <View style={layout.section}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterButton label="All" count={20} onPress={() => { }} />
        <FilterButton label="Active" count={10} onPress={() => { }} />
        <FilterButton label="Inactive" count={10} onPress={() => { }} />
      </View>
      <List
        columns={[
          { label: "Company", key: "company" },
          { label: "Location", key: "location" },
          { label: "Facility Type", key: "facility_type" },
          { label: "Ship Type", key: "ship_type" },
        ]}
        data={[
          { id: "1", company: "loggistics", location: "123 Main St", facility_type: "Factory", ship_type: "shipper" },
          { id: "2", company: "winMove", location: "321 Main St", facility_type: "Warehouse", ship_type: "receiver" },
        ]}
        onItemPress={(item) => navigation.navigate("WarehouseDetail", { item })}
      />
    </SafeAreaView>
  );
}

