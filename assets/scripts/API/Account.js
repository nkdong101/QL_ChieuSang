import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  MobileLogin({ AccessToken, Email, Password }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Account_MobileLogin,
        method: 'post',
        params: { AccessToken, Email, Password },
        action: re => {
          rs(re);
        }
      })
    })
  },
  ResetPassword({ Email }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Account_ResetPassword,
        method: 'post',
        params: { Email },
        action: re => {
          rs(re);
        }
      })
    })
  },
  ChangePassword({ Id, Password_Old, Password_new }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Account_ChangePassword,
        method: 'post',
        params: { Id, Password_Old, Password_new },
        action: re => {
          rs(re);
        }
      })
    })
  },

}
