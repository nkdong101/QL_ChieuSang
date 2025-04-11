import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetList() {
    return new Promise(rs => {
      GetDataAPI({
        url: API.EmailConfig_GetList,
        action: re => {
          rs(re);
        }
      })
    })
  },
  TestSendEmail({ type, time, user, user_cc }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.EmailConfig_TestSendEmail,
        params: { type, time, user, user_cc: '' },
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
        url: API.EmailConfig_Add,
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
        url: API.EmailConfig_Edit,
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
        url: API.EmailConfig_Delete,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
}
