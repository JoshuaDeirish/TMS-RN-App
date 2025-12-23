import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import layout from "../../styles/layout";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import ScreenHeader from "../../Components/ScreenHeader";
import buttons from "../../styles/buttons";
import typography from "../../styles/typography";
import DetailsList from "../../Components/DetailsList";

export default function TrailerDetailsScreen() {
  const navigation = useNavigation();
   const route = useRoute();
   const { item } = route.params;
 
   return (
     <SafeAreaView style={layout.container}>
       {/* Header */}
       <ScreenHeader
         title="Trailer Details"
         backText="Trailers"
         onBack={() => navigation.navigate("TrailerList")}
       />
 
       <TwoColumnLayout
   leftContent={
     <View style={styles.leftBox}>
       <View style={styles.imageWrapper}>
         <Image
           source={{ uri: item.imageUrl || "https://via.placeholder.com/150" }}
           style={styles.vehicleImage}
         />
       </View>
 
       <View style={styles.buttonGroup}>
         <TouchableOpacity
           style={buttons.primary}
           onPress={() => navigation.navigate("TrailerEdit", { item })}
         >
           <Text style={buttons.primaryText}>Edit Trailer</Text>
         </TouchableOpacity>
 
         <TouchableOpacity
           style={buttons.secondary}
           onPress={() => navigation.goBack()}
         >
           <Text style={buttons.secondaryText}>Back</Text>
         </TouchableOpacity>
       </View>
     </View>
   }
 
   rightContent={
     <DetailsList
       data={[
         { label: "Trailer ID", value: item.trailer_number },
         { label: "Type", value: item.type },
         { label: "Capacity (Tons)", value: `${item.capacity_tons} kg` },
         { label: "Status", value: item.status },
       ]}
     />
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