import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import Address from "./menu/Location";
import API from "../API";
export default class dm_Lighting_Group {
  Route_Cabinet_id; // tủ chiếu sáng
  Route_Cable_id; //doạn cáp
  Route_id; //tuyến đường
  _formElements = {
    Route_Cabinet_id: new FormElement({
      label: "Tủ chiếu sáng",
      model: "Route_Cabinet_id",
      type: FormElementType.select,
      options: Para.dm_Route_cabinet,
      watch(data, n, o, t, iF) {
        if (!iF) {
          if (n != o) {
            // data.Route_Cable_id = "";
            console.log(data.Route_Cable_id);
          }
        }
      },
    }),
    Route_Cable_id: new FormElement({
      label: "Đoạn cáp",
      model: "Route_Cable_id",
      type: FormElementType.select,
      options(data) {
        return new SelectOption({
          data: API.Route_Cable_GetList,

          key: "Route_Cable_id",
          params: {
            iRoute_Cabinet_id: data.Route_Cabinet_id || "",
          },
        });
      },
    }),
    Route_id: new FormElement({
      label: "Tuyến đường",
      model: "Route_id",
      type: FormElementType.select,
      options: Para.dm_Routes,
    }),
  };

  /**
   *
   * @param {dm_Lighting_Group} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {dm_Lighting_Group} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    };
  }
  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Route_id,
        this._formElements.Route_Cabinet_id,
        this._formElements.Route_Cable_id,

        // new FormElement({
        //   child: [
        //     this._formElements.Location_lat,
        //     this._formElements.Location_lng,
        //   ],
        // }),

        // this._formElements.Use,
      ],
    });
  }
}
