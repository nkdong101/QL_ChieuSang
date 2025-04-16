import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import Address from "./menu/Location";
export default class Route_Cable {
  Index;
  /** @type {string} - description */
  Code;
  Name;
  /** @type {string} - description */
  Route_cabinet_id;
  /** @type {string} - description */
  Height;
  /** @type {string} - description */
  Nhanh_cap;
  /** @type {string} - description */
  Route_cabinet_id;
  /** @type {string} - description */
  Locations;
  /** @type {string} - description */
  Form_id;
  Cable_type_id;
  Distance;
  DateActive;
  DateRepair;
  Reason_Repair;
  Const_Repair_id;
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
    Index: new FormElement({
      label: "Thứ tự",
      model: "Index",
      type: FormElementType.text,
    }),
    Code: new FormElement({
      label: "Mã đoạn cáp",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên đoạn cáp",
      model: "Name",
      type: FormElementType.text,
    }),

    Nhanh_cap: new FormElement({
      label: "Nhánh cáp",
      model: "Nhanh_cap",
      type: FormElementType.number,
      validate(data, t) {
        const slt = t.getEntry("Route_cabinet_id")?.selectedData;
        const cableBranch = slt?.Cable_branch;
        if (!cableBranch) return;
        if (data.Nhanh_cap > cableBranch || data.Nhanh_cap < 1) {
          return `0 < Nhánh cáp < ${cableBranch}`;
        }
        // console.log(slt);
      },
    }),
    Route_cabinet_id: new FormElement({
      id: "Route_cabinet_id",
      label: "Tủ điều khiển",
      model: "Route_cabinet_id",
      type: FormElementType.select,
      options: Para.dm_Route_cabinet,
    }),
    Locations: new FormElement({
      label: "Danh sách tọa độ",
      model: "Locations",
      type: FormElementType.text,
      // options: Para.dm_Column_Type,
    }),
    Form_id: new FormElement({
      label: "Hình thức lắp",
      model: "Form_id",
      type: FormElementType.select,
      options: Para.Cable_form,
      // options: Para.dm_Column_Type,
    }),
    Cable_type_id: new FormElement({
      label: "Loại cáp",
      model: "Cable_type_id",
      type: FormElementType.select,
      options: Para.dm_Cable_type,
      // options: Para.dm_Column_Type,
    }),
    Distance: new FormElement({
      label: "Chiều dài đoạn cáp",
      model: "Distance",
      type: FormElementType.number,
      labelWidth: 150,
    }),
    DateActive: new FormElement({
      label: "Ngày lắp đặt",
      model: "DateActive",
      type: FormElementType.datePicker,
    }),
    DateRepair: new FormElement({
      label: "Ngày sửa chữa",
      model: "DateRepair",
      type: FormElementType.datePicker,
      attr: {
        disabledCrDate: true,
      },
      disabled: true,
    }),
    Const_Repair_id: new FormElement({
      label: "Đơn vị sửa",
      model: "Const_Repair_id",
      disabled: true,
      type: FormElementType.select,
      options: Para.dm_Construction_Unit,
    }),
    Reason_Repair: new FormElement({
      label: "Lý do sửa",
      disabled: true,
      model: "Reason_Repair",
      type: FormElementType.text,
      attr: {
        type: "textarea",
        rows: 2,
      },
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
   * @param {Route_Cable} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Route_Cable} obj
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
          direction: FormElementType.horizontal,
          child: [
            new FormElement({
              direction: FormElementType.vertical,
              child: [
                new FormElement({
                  child: [
                    this._formElements.Index.set((p) => (p.col = 6)),
                    this._formElements.Code.set((p) => (p.col = 10)),
                    this._formElements.Name.set((p) => (p.col = 10)),
                  ],
                }),
                new FormElement({
                  child: [
                    this._formElements.Route_cabinet_id,
                    this._formElements.Nhanh_cap,
                  ],
                }),
                new FormElement({
                  child: [
                    this._formElements.Form_id,
                    this._formElements.Cable_type_id,
                  ],
                }),
                new FormElement({
                  child: [
                    this._formElements.Distance,
                    this._formElements.DateActive,
                  ],
                }),
                new FormElement({
                  child: [
                    this._formElements.Const_Repair_id,
                    this._formElements.DateRepair,
                  ],
                }),

                this._formElements.Reason_Repair,
              ],
            }),

            new FormElement({
              type: "FromToLocation",
              attr: {
                p_Obj: this,
                isMultiLocation: true,
              },
            }),
          ],
        }),

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
