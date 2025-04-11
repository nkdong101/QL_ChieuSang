import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  GetList(iOffice_id) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.dm_department_Get_List,
        params:{
            iOffice_id: iOffice_id,
        },
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
        url: API.dm_department_Add,
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
        url: API.dm_department_Edit,
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
        url: API.dm_department_Delete,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
}
