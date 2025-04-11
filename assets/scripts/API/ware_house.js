import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetDetail({ id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Ware_house_GetDetail,
        params: { id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  GetList() {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Ware_house_Get_List,
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
        url: API.Ware_house_Add,
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
        url: API.Ware_house_Edit,
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
        url: API.Ware_house_Delete,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
}
