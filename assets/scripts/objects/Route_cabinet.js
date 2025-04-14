import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import Location from "./menu/Location";
export default class Route_cabinet {
  /** @type {string} - description */
  Code;

  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  Address;
  /** @type {number} - description */
  Box_Type;
  /** @type {number} - description */
  Box_Control;
  /** @type {number} - description */
  Cabinet_D;
  /** @type {number} - description */
  Cabinet_R;
  /** @type {number} - description */
  Cabinet_C;
  /** @type {number} - description */
  Cable_branch;
  /** @type {string} - description */
  Lighting_Group_Id;
  /** @type {string} - description */
  Construction_id;
  /** @type {string} - description */
  DateActive;
  /** @type {string} - description */
  Date_Warranty;
  /** @type {string} - description */
  Project_Code;
  /** @type {string} - description */
  Description;

  Location = new Location();
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
    Description: new FormElement({
      label: "Mô tả",
      model: "Description",
      type: FormElementType.text,
      attr: {
        type: "textarea",
        rows: 2,
      },
    }),
    Code: new FormElement({
      label: "Mã tủ",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên tủ",
      model: "Name",
      type: FormElementType.text,
    }),
    Address: new FormElement({
      label: "Địa chỉ lắp",
      model: "Address",
      type: FormElementType.address,
      watch(data, n, o, t, iF) {
        if (!iF) {
          // console.log("dataAddress", data.Address);
          // console.log("dataLocation", data.Location);
        }
      },
    }),
    Location_lng: new FormElement({
      label: "Kinh độ",
      model: "Location.Lng",
      type: FormElementType.text,
    }),
    Location: new FormElement({
      model: "Location",
      type: FormElementType.location,
    }),
    Box_Type: new FormElement({
      label: "Hình thức đặt",
      model: "Box_Type",
      type: FormElementType.select,
      options: Para.Box_Type,
    }),
    Box_Control: new FormElement({
      label: "Cách thức điều khiển",
      model: "Box_Control",
      type: FormElementType.select,
      options: Para.Box_Control,
      labelWidth: 170,
    }),
    Cabinet_D: new FormElement({
      // label: "Chiều dài",
      model: "Cabinet_D",
      type: FormElementType.number,
      attr: {
        placeholder: "Dài",
      },
      // col: 3,
    }),
    Cabinet_R: new FormElement({
      model: "Cabinet_R",
      // col: 3,
      type: FormElementType.number,
      attr: {
        placeholder: "Rộng",
        suffixIcon: null,
      },
    }),
    Cabinet_C: new FormElement({
      // label: "	Chiều cao",
      model: "Cabinet_C",
      // col: 3,
      type: FormElementType.number,
      attr: {
        placeholder: "Cao",
      },
    }),
    Cable_branch: new FormElement({
      label: "Số lượng nhánh cáp",
      model: "Cable_branch",
      labelWidth: 160,
      type: FormElementType.number,
      // col: 15,
      // options: Para.Box_Control,
    }),
    Lighting_Group_Id: new FormElement({
      label: "Nhóm tủ",
      model: "Lighting_Group_Id",
      type: FormElementType.select,

      options: Para.dm_Lighting_Group,
    }),
    Construction_id: new FormElement({
      label: "Đơn vị thi công",
      model: "Construction_id",
      type: FormElementType.select,

      options: Para.dm_Construction_Unit,
    }),
    DateActive: new FormElement({
      label: "Ngày thi công",
      model: "DateActive",
      type: FormElementType.datePicker,

      // options: Para.dm_Construction_Unit,
    }),
    Date_Warranty: new FormElement({
      label: "Ngày hết bảo hành",
      model: "Date_Warranty",
      labelWidth: 140,
      type: FormElementType.datePicker,
      attr: {
        disabledCrDate: true,
      },
      // options: Para.dm_Construction_Unit,
    }),
    Project_Code: new FormElement({
      label: "Mã dự án",
      model: "Project_Code",
      // type: FormElementType.tes,

      // options: Para.dm_Construction_Unit,
    }),
  };

  /**
   *
   * @param {Route_cabinet} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Route_cabinet} obj
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
      labelWidth: 120,
      elements: [
        new FormElement({
          child: [
            new FormElement({
              direction: FormDirectionType.vertical,
              child: [
                new FormElement({
                  child: [this._formElements.Code, this._formElements.Name],
                }),

                this._formElements.Address,
                // new FormElement({
                //   child: [
                this._formElements.Box_Type,
                this._formElements.Box_Control,
                //   ],
                // }),

                new FormElement({
                  direction: FormDirectionType.horizontal,
                  child: [
                    new FormElement({
                      label: "Móng tủ (D x R x C) cm",
                      type: "label",
                      // col: 5,
                    }),
                    this._formElements.Cabinet_D,
                    this._formElements.Cabinet_R,
                    this._formElements.Cabinet_C,
                  ],
                }),

                new FormElement({
                  direction: FormDirectionType.horizontal,
                  child: [
                    this._formElements.Project_Code,
                    this._formElements.Cable_branch,
                  ],
                }),
                new FormElement({
                  child: [
                    this._formElements.Lighting_Group_Id,
                    this._formElements.Construction_id,
                  ],
                }),
                new FormElement({
                  child: [
                    this._formElements.DateActive,
                    this._formElements.Date_Warranty,
                  ],
                }),
                this._formElements.Description,
              ],
            }),
            this._formElements.Location,
          ],
        }),
        // this._formElements.Use,
      ],
    });
  }
}
