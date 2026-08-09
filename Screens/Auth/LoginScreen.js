import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import typography from '../../styles/typography';
import colours from '../../styles/colours';
import input from '../../styles/input';
import buttons from '../../styles/buttons';
import { Checkbox } from '../../Components/Checkbox';
import { AuthContext } from '../../Services/Context/AuthContext';


export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    setError("")

    try {
      await login({
        email: form.email,
        password: form.password
      });
    } catch (err) {
      setError(
        err?.detail ||
        err?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Text style={typography.heading.h1}>Login Screen</Text>
        <TextInput
          style={input.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => update("email", value)}
        />
        <TextInput
          style={input.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChange={(value) => update("password", value)}
        />
        {
          error ? (
            <Text
              style={{
                color: "red",
                marginBottom: 10,
              }}
            >
              {error}
            </Text>
          ) : null
        }
        <TouchableOpacity style={buttons.primary}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={buttons.primaryText}>{loading ? "Loading..." : "Login"}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Checkbox />
          <Text>Remember Me</Text>
        </View>
        <TouchableOpacity>
          <Text style={typography.text.p}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
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