import fixed_asset from "./fixed_asset";
import Util from "./Util";
import dm_store from "./dm_store";
import dm_vehicle_Type from "./dm_vehicle_Type";
import dm_department from "./dm_department";
import fixed_asset_state from "./fixed_asset_state";
import fixed_asset_type from "./fixed_asset_type";
import fixed_asset_group from "./fixed_asset_group";
import producer from "./producer";
import purchase from "./purchase";
import ware_house from "./ware_house";
import transfer from "./transfer";
import ticket from "./ticket";
import inventory from "./inventory";
import disposal from "./disposal";
import EmailConfig from "./EmailConfig";
import dashboard from "./dashboard";
import Account from "./Account";

export default {
  fixed_asset_type: fixed_asset_type,
  fixed_asset_group: fixed_asset_group,
  fixed_asset_state: fixed_asset_state,
  producer: producer,
  purchase: purchase,
  dm_store: dm_store,
  dm_vehicle_Type: dm_vehicle_Type,
  dm_department: dm_department,
  ware_house: ware_house,
  util: Util,
  fixed_asset: fixed_asset,
  transfer: transfer,
  ticket: ticket,
  inventory: inventory,
  disposal: disposal,
  dashboard: dashboard,
  EmailConfig: EmailConfig,
  Account: Account,


}
