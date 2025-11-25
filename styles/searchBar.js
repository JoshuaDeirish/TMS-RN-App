import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
   
    position: "relative",
  },

  icon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: [{ translateY: -9 }],
    color: "#aaa",
    zIndex: 2,
  },

  input: {
    backgroundColor: "#2C2C2C",
    color: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
    fontSize: 16,
    paddingLeft: 42,
  },
});
