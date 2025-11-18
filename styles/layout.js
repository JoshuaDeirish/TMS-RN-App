// styles/layout.js
import colours from "./colours";

export default {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colours.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullHeight: {
    height: '100%',
  },
};
