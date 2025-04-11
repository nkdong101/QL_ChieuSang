import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetListIndividual() {
    return new Promise((rs) => {
      GetDataAPI({
        url: API.fixed_asset_Get_List_Individual,
        action: (re) => {
          rs(re);
        },
      });
    });
  },
  GetList({ From, To, Office_id, Project_Code, State,Type,User_ID }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.fixed_asset_Get_List,
        params: { From, To, Office_id, Project_Code, State,Type,User_ID },
        action: re => {
          rs(re);
        },
      });
    });
  },
  Get_List_In_Warehouse({ iDisposal_id }) {
    return new Promise((rs) => {
      GetDataAPI({
        url: API.fixed_asset_Get_List_In_Warehouse,
        params: { iDisposal_id },
        action: (re) => {
          rs(re);
        },
      });
    });
  },
  Get_List_By_Ids({ Ids }) {
    return new Promise((rs) => {
      GetDataAPI({
        url: API.fixed_asset_Get_List_By_Ids,
        params: { Ids },
        action: (re) => {
          rs(re);
        },
      });
    });
  },
  Add(obj) {
    return new Promise((rs) => {
      GetDataAPI({
        method: "post",
        url: API.fixed_asset_Add,
        params: obj,
        action: (re) => {
          rs(re);
        },
      });
    });
  },
  Edit(obj) {
    return new Promise((rs) => {
      GetDataAPI({
        method: "post",
        url: API.fixed_asset_Edit,
        params: obj,
        action: (re) => {
          rs(re);
        },
      });
    });
  },
  Delete(obj) {
    return new Promise((rs) => {
      GetDataAPI({
        method: "post",
        url: API.fixed_asset_Delete,
        params: obj,
        action: (re) => {
          rs(re);
        },
      });
    });
  },
  Disposal(obj) {
    return new Promise((rs) => {
      GetDataAPI({
        method: "post",
        url: API.fixed_asset_Disposal,
        params: obj,
        action: (re) => {
          rs(re);
        },
      });
    });
  },
};
