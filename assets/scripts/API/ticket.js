import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  Get_List_ByAssets({ iFixed_assset_id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Ticket_Get_List_ByAssets,
        params: { iFixed_assset_id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  GetList({ From, To, State }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Ticket_Get_List,
        params: { From, To, State },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Get_Info({ iTicket_id }) {
    return new Promise(rs => {
      GetDataAPI({
        url: API.Ticket_Get_Info,
        params: { iTicket_id },
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
        url: API.Ticket_Add,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Approved({ iTicket_id, iRejected }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'get',
        url: API.Ticket_Approved,
        params: { iTicket_id, iRejected },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Finish({ iTicket_id }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'get',
        url: API.Ticket_Finish,
        params: { iTicket_id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Success({ iTicket_id }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'get',
        url: API.Ticket_Success,
        params: { iTicket_id },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Cancel(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Ticket_Cancel,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Executor(obj) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Ticket_Executor,
        params: obj,
        action: re => {
          rs(re);
        }
      })
    })
  },
  Comment({ Ticket_id, Comment, File_Attach }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'post',
        url: API.Ticket_Comment,
        params: { Ticket_id, Comment, File_Attach },
        action: re => {
          rs(re);
        }
      })
    })
  },
  Get_Comment({ iTicket_id }) {
    return new Promise(rs => {
      GetDataAPI({
        method: 'get',
        url: API.Ticket_Get_Comment,
        params: { iTicket_id },
        action: re => {
          rs(re);
        }
      })
    })
  },

}
