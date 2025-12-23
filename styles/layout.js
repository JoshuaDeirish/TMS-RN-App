// styles/layout.js
import colours from "./colours";

export default {
  container: {
    flex: 1,
    backgroundColor: colours.background,
  },
  containerTwo: {
    flex: 1,
    backgroundColor: colours.headerBackground,
  },
  subContainer: {
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
  section: {
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
    columnGap: 5,
  }
};
