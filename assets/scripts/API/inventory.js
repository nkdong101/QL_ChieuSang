import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetList({ Form, To, State }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Inventory_Get_List,
        params: { Form, To, State },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Get_Info({ iId }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Inventory_Get_Info,
        params: { iId },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Get_List_Individual({ Form, To, State }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Get_List_Individual,
        params: { Form, To, State },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Get_List_ByAssets({ iFixed_assset_id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Inventory_Get_List_ByAssets,
        params: { iFixed_assset_id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Add(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Inventory_Add,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Edit(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Inventory_Edit,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Submitted(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Inventory_Submitted,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Approved(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Inventory_Approved,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Delete(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Inventory_Delete,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
}
