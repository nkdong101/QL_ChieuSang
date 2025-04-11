import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetList() {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Transfer_Get,
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
        url: API.Transfer_Add,
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
        url: API.Transfer_Edit,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Approved({ Fixed_Asset_id, Type }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Transfer_Approved,
        params: { Fixed_Asset_id, Type },
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
        url: API.Transfer_Delete,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
}
