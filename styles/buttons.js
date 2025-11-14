// styles/buttons.js

const baseButton = {
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: 'center',
};

const buttons = {
  // 🔵 Primary Button
  primary: {
    ...baseButton,
    backgroundColor: '#007bff',
  },
  primaryText: {
    color: '#fff',
    fontWeight: 'semi-bold',
    fontSize: 18,
  },

  // ⚪ Secondary Button
  secondary: {
    ...baseButton,
    backgroundColor: '#6c757d',
  },
  secondaryText: {
    color: '#fff',
    fontWeight: 'semi-bold',
    fontSize: 18,
  },

  // 🔴 Danger Button
  danger: {
    ...baseButton,
    backgroundColor: '#dc3545',
  },
  dangerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // 🚫 Disabled Button
  disabled: {
    ...baseButton,
    backgroundColor: '#cccccc',
  },
  disabledText: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // 🔲 Optional: Outline Button (for filters or tags)
  outline: {
    ...baseButton,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  outlineText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default buttons;
