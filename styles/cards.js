// styles/cards.js

const base = {
  padding: 16,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#e5e5e5",
};

export default {
  base,

  elevated: {
    ...base,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  warning: {
    ...base,
    backgroundColor: "#FFF8E1",
    borderColor: "#FFCC80",
  },

  horizontal: {
    ...base,
    flexDirection: "row",
    alignItems: "center",
  },

  textLeftImageRight: {
    ...base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
