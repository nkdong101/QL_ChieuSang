import API, { ServerAPI } from "../API";
import GetDataAPI from "../GetDataAPI";

export default {
  UploadFile({ file, path }) {
    return new Promise(rs => {
      let data = new FormData();
      data.append('file', file);
      GetDataAPI({
        url: ServerAPI.APISaveFileToServer,
        params: data,
        method: 'post',
        headers: {
          path: path
        },
        action: re => {
          rs(re[0]);
        }
      })
    });
  }
}
