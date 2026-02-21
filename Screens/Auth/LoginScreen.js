import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import typography from '../../styles/typography';
import colours from '../../styles/colours';
import input from '../../styles/input';
import buttons from '../../styles/buttons';
import { Checkbox } from '../../Components/Checkbox';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={typography.heading.h1}>Login Screen</Text>
        <TextInput style={input.input} placeholder="Email" />
        <TextInput style={input.input} placeholder="Password" />
        <TouchableOpacity style={buttons.primary}>
          <Text style={buttons.primaryText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox onChange={()=>{}} />
          <Text style={typography.text.p}>Forgot Password?</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={typography.heading.h1}>Login Pic</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      flexDirection: "row",
      padding: 20,
      
    },
    leftContainer: {
      flex: 1,
      backgroundColor: colours.headerBackground,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
  
    },
    rightContainer: {
      flex: 1,
      backgroundColor: colours.accent,
      padding: 20,
   
    },
});