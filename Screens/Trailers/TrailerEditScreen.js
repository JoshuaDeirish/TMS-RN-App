import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import input from '../../styles/input';
import TwoColumnLayout from '../../Components/TwoColumnLayout';
import VerticalTabs from '../../Components/VerticalTabs';
import ScreenHeader from '../../Components/ScreenHeader';
import layout from '../../styles/layout';

export default function TrailerEditScreen() {
  const route = useRoute();
    const { item } = route.params; 
    const [activeTab, setActiveTab] = useState("details");
  
    // Prefill form state
    const [trailerNumber, setTrailerNumber] = useState(item.trailer_number);
    const [capacity_tons, setCapacityTons] = useState(item.capacity_tons);
    const [type, setType] = useState(item.type);
    const [status, setStatus] = useState(String(item.status));
    
    
    return (
      <SafeAreaView style={layout.container}>
              <ScreenHeader
                title="Edit Trailer"
                backText="Trailers"
                onBack={() => navigation.navigate("TrailerList")}
                onSave={() => console.log("Save Trailer")}
              />
  
        <TwoColumnLayout
        leftContent={
  
        <VerticalTabs
                    active={activeTab}
                    onChange={setActiveTab}
                    tabs={[
                      { key: "details", label: "Details" },
                      { key: "specs", label: "Specifications" },
                      { key: "financial", label: "Financial Info" },
                    ]}
                  />
        }
  
        rightContent={
  
            <View>
              {activeTab === "details" && (
                <View>
                  <TextInput value={trailerNumber} onChangeText={setTrailerNumber} style={input.input} placeholder="Trailer Number" />
                  <TextInput value={capacity_tons} onChangeText={setCapacityTons} style={input.input} placeholder="Capacity Tons" />
                  <TextInput value={type} onChangeText={setType} style={input.input} placeholder="Type" />
                  <TextInput value={status} onChangeText={setStatus} style={input.input} placeholder="Status" />
                </View>
              )}
  
              {activeTab === "specs" && (
                <View>
                  
                </View>
              )}
  
              {activeTab === "financial" && (
                <View>
                 
                </View>
              )}
            </View>
        }
  
        />
        
      </SafeAreaView>
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