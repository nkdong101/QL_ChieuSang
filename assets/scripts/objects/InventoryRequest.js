import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import { GetStartMonth, GetTimeNow, IsAfterDate } from "../Functions";
import { SelectOption } from "../base/SelectOption";
import API from "../API";
import GetDataAPI from "../GetDataAPI";

export default class InventoryRequest {
  /** @type {string} - description */
  //   To = GetTimeNow();
  // /** @type {string} - description */
  // From = new Date(new Date().getFullYear() - 1, new Date().getMonth(),new Date().getDate());

  /** @type {string} - description */
  State;
  /** @type {string} - description */
  Description;

  Store;
  Offices;

  /** @type {boolean} - description */
  Active = true;

  /** @type {string} - description */
  ToDate;
  /** @type {string} - description */
  FromDate;
  /** @type {string} - description */
  Id;

  Persons = [];
  /**
   *
   * @param {InventoryRequest} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {InventoryRequest} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      From: new FormElement({
        label: "Từ Ngày",
        model: "FromDate",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
      }),
      To: new FormElement({
        label: "Đến ngày",
        model: "ToDate",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
        validate(data) {
          if (data.ToDate) {
            if (!IsAfterDate(data.ToDate, data.FromDate)) {
              return "Thời gian không hợp lệ";
            }
          }
        },
      }),
      Active: new FormElement({
        label: "Đang kiểm kê",
        model: "Active",
        type: FormElementType.checkbox,
        disabled: true,
        // options: Para.InventoryState.set((p) => (p.placeholder = "All")),
        col: 9,
        labelWidth: 120,
        watch(data, n, o, t, iF) {
          if (!iF) {
            // console.log(data)
            const obj = data.toJSON();
            obj.Offices = obj.Offices.toString();
            obj.Store = obj.Store.join(",");
            // const n = obj.deleteProperty();
            const Person = obj.Persons.map((p) => {
              return {
                Inventory_id: obj.Id,
                ...p,
                // Name:
              };
            });
            if (data.viewOnly) {
              t.formInfo.vm.$emit("activeChange", data.Active);
              // t.$emit('change',re)
            }
          }
        },
      }),
      Description: new FormElement({
        label: "Nội dung",
        model: "Description",
        type: FormElementType.text,
        attr: {
          type: "textarea",
          rows: 2,
        },
      }),
      Store: new FormElement({
        label: "Store",
        model: "Store",
        type: FormElementType.select,
        options(data) {
          // console.log(data.Offices);
          return new SelectOption({
            data:
              data.Offices && data.Offices.length ? API.dm_GetbyManyOffice : [],
            params: {
              iOffices: data.Offices || [],
            },
            multiple: true,
          });
        },
      }),
      Offices: new FormElement({
        label: "Văn phòng",
        model: "Offices",
        type: FormElementType.select,
        options: Para.Para_Office,
        disabled(data) {
          return !data.isAdd;
        },
        required: true,
        // watch(data){
        //   console.log(data.Offices)
        // }
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 120,
      elements: [
        // this._formElements.Offices,
        // this._formElements.Store,
        this._formElements.Description,
        new FormElement({
          direction: FormDirectionType.vertical,
          child: [
            this._formElements.From,
            this._formElements.To,
            this._formElements.Active,
            this._formElements.Offices,
          ],
        }),

        new FormElement({
          id: "Offices_IVT_RQ",
          type: "Offices_IVT_RQ",
          attr: {
            data: this,
          },
        }),
        // new FormElement({
        //   id: 'NguoiTG',
        //   type: 'NguoiTG',
        //   attr:{
        //     data: this,
        //   }
        // }),
      ],
    });
  }

  deleteProperty() {
    return {
      ...this,
      Persons: undefined,
      _formElements: undefined,
      Office_Info: undefined,
      Store_Info: undefined,
      viewOnly: undefined,
    };
  }

  toJSON() {
    return {
      ...this,
      _formElements: undefined,
      Office_Info: undefined,
      Store_Info: undefined,
      viewOnly: undefined,
    };
  }
}
