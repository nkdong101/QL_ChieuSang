import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  Get_CurrentByDate({ iDate }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Get_CurrentByDate,
        params: { iDate },
        action: re => {
          rs(re);
        }
      })
    })
  },

}
