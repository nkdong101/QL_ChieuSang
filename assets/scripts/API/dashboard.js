import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  /**
   * @param {{
   *  iType: string
   *  iState: number
   * }} obj - description
  */
  GetCounterByState(obj) {
    return new Promise(rs => {
      GetDataAPI({
        isWait: false,
        url: API.Dashboard_GetCounterByState,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  }
}
