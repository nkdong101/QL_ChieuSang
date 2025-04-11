import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetList() {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Disposal_Get_List,
        action: re => {
          rs(re);
        }
      })
    })
  },
  GetDetail({ Id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Disposal_GetDetail,
        params: { Id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Add(obj) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Disposal_Add,
        params: obj,
        method: 'post',
        action: re => {
          rs(re);
        }
      })
    })
  },
  Edit(obj) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Disposal_Edit,
        method: 'post',
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },

}
