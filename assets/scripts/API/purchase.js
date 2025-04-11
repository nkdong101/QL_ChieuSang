import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  SearchPR({ iSearchInfo }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Purchase_SearchPR,
        params: { iSearchInfo },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Get_List_Approval() {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Purchase_Get_List_Approval,
        action: re => {
          rs(re);
        }
      })
    })
  },
  GetInfo({ pr_id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Purchase_Get_Info,
        params: {
          iId: pr_id,
        },
        action: (re) => {
          rs(re)
        },
      });
    })
  },
  SendReminder({ pr_id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Purchase_SendReminder,
        params: {
          iId: pr_id,
        },
        action: (re) => {
          rs(re)
        },
      });
    })
  },
  SavePurchasingManager({ pr_id, pm_id, type }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Purchase_SavePurchasingManager,
        params: {
          pr_id: pr_id,
          pm_id: pm_id,
          type: type,
        },
        action: (re) => {
          rs(re)
        },
      });
    })
  },
  SaveTechinicalConsulting(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Purchase_SaveTechinicalConsulting,
        params: obj,
        action: (re) => {
          rs(re)
        },
      });
    })
  },
  TranferToProcurement(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Purchase_TranferToProcurement,
        params: obj,
        action: (re) => {
          rs(re)
        },
      });
    })
  },
  ProcurementTranferToOrder({ pr_no }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'get',
        url: API.Purchase_ProcurementTranferToOrder,
        params: { pr_no },
        action: (re) => {
          rs(re)
        },
      });
    })
  },
  /**
   * @param {{
   *  iType:  'ForOffice'|'ForProcurment'
   *  iState: number,
   * }} obj - description
  */
  List_Purchase(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'get',
        url: API.Get_List_Purchase,
        params: obj,
        action: (re) => {
          rs(re)
        },
      });
    })
  },
}
