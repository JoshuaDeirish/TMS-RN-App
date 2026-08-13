/**
 * MaintenanceStation screens, generated from resources/maintenanceStations.js by the resource scaffold.
 *
 * Behaviour (loading, error, empty, search, filters, role checks, validation)
 * lives in Screens/_scaffold; only this domain's fields and permissions are
 * declared in the config. To customise one screen, replace its import in
 * Navigation/Stacks/MaintenanceStationStack.js with a hand-written component.
 */

import createResourceScreens from "../_scaffold/createResourceScreens";
import config from "../../resources/maintenanceStations";

export const { ListScreen, DetailsScreen, AddScreen, EditScreen } =
  createResourceScreens(config);
