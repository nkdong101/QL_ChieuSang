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
  Location = new Address();
  /** @type {string} - description */
  Code;

  /** @type {string} - description */
  Address;
  /** @type {string} - description */
  Height;
  /** @type {string} - description */
  Hangsx_id;
  /** @type {string} - description */
  Routes_id;
  /** @type {string} - description */
  Commune_id;
  /** @type {string} - description */
  Route_cabinet_id;
  /** @type {string} - description */
  Route_Cables;
  /** @type {string} - description */
  Column_Type_id;
  /** @type {number} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;

  _formElements = {
    Address: new FormElement({
      label: "Địa chỉ",
      model: "Address",
      type: FormElementType.address,
    }),
    Routes_id: new FormElement({
      label: "Tuyến đường",
      model: "Routes_id",
      type: FormElementType.select,
      options: Para.dm_Routes.set((p) => (p.multiple = true)),
    }),
    Route_Cables: new FormElement({
      label: "Đoạn cáp",
      model: "Route_Cables",
      type: FormElementType.select,
      options(data) {
        return new SelectOption({
          data: API.Route_Cable_GetList,
          key: "Route_Cable_id",
          params: {
            iRoute_Cabinet_id: data.Route_cabinet_id || "",
          },
          multiple: true,
        });
      },
    }),
    Commune_id: new FormElement({
      label: "Xã/Phường",
      model: "Commune_id",
      type: FormElementType.select,
      options: Para.dm_Commune,
    }),
    Code: new FormElement({
      label: "Mã",
      model: "Code",
      type: FormElementType.text,
    }),
    Height: new FormElement({
      label: "Chiều cao",
      model: "Height",
      type: FormElementType.number,
    }),
    Hangsx_id: new FormElement({
      label: "Hãng sản xuất",
      model: "Hangsx_id",
      type: FormElementType.select,
      options: Para.dm_Hangsx,
    }),
    Route_cabinet_id: new FormElement({
      label: "Tủ điều khiển",
      model: "Route_cabinet_id",
      type: FormElementType.select,
      options: Para.dm_Route_cabinet,
    }),
    Column_Type_id: new FormElement({
      label: "Loại cột",
      model: "Column_Type_id",
      type: FormElementType.select,
      options: Para.dm_Column_Type,
    }),
    Location: new FormElement({
      model: "Location",
      type: FormElementType.location,
      // options: Para.dm_Column_Type,
    }),
    Id: new FormElement({
      label: "Id",
      model: "Id",
      type: FormElementType.text,
    }),
    DateUpdate: new FormElement({
      label: "DateUpdate",
      model: "DateUpdate",
      type: FormElementType.text,
    }),
    DateCreate: new FormElement({
      label: "DateCreate",
      model: "DateCreate",
      type: FormElementType.text,
    }),

    UserCreate: new FormElement({
      label: "UserCreate",
      model: "UserCreate",
      type: FormElementType.text,
    }),
    UserUpdate: new FormElement({
      label: "UserUpdate",
      model: "UserUpdate",
      type: FormElementType.text,
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
        new FormElement({
          child: [this._formElements.Code, this._formElements.Height],
        }),
        new FormElement({
          child: [
            this._formElements.Hangsx_id,

            this._formElements.Route_cabinet_id,
          ],
        }),
        new FormElement({
          child: [
            this._formElements.Routes_id,
            this._formElements.Column_Type_id,
          ],
        }),
        new FormElement({
          child: [
            this._formElements.Commune_id,
            this._formElements.Route_Cables,
          ],
        }),

        this._formElements.Address,
        this._formElements.Location,

        // new FormElem1ent({
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
