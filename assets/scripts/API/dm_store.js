import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  Get_List_by_Type({ iType_id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.dm_store_Get_List,
        params: { iType_id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  GetList() {
    return new Promise(rs => {
      GetDataAPI({
        url: API.dm_store_Get_List,
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
        url: API.dm_store_Add,
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
        url: API.dm_store_Edit,
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
        url: API.dm_store_Delete,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
}
