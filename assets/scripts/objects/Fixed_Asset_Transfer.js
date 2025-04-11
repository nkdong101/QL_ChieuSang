import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import { SelectOption } from "../base/SelectOption";

export default class Fixed_Asset_Transfer {
  /** @type {number} - description */
  Fixed_Asset_id;
  /** @type {string} - description */
  From_Holder_id;
  /** @type {string} - description */
  From_Holder_Name;
  /** @type {number} - description */
  From_Type_id;
  /** @type {string} - description */
  To_Holder_Id = "";
  /** @type {string} - description */
  To_Holder_Name;
  /** @type {number} - description */
  To_Type_id;
  /** @type {number} - description */
  Fixed_State;
  /** @type {string} - description */
  Start_Date;
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Approved_Date;
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;

  /**
   *
   * @param {Fixed_Asset_Transfer} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Fixed_Asset_Transfer} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Fixed_Asset_id: new FormElement({
        label: "Fixed_Asset_id",
        model: "Fixed_Asset_id",
        type: FormElementType.text,
      }),
      From_Holder_id: new FormElement({
        label: "From Holder",
        model: "From_Holder_id",
        type: FormElementType.text,
        disabled: true,
      }),
      From_Holder_Name: new FormElement({
        label: "Từ vị trí",
        model: "From_Holder_id",
        type: FormElementType.select,
        disabled: true,
        options(data) {
          console.log(data);
          return Para.store_Get_List.set((p) => {
            p.data = p.data.filter((p1) => {
              if (data.Office_id == p1.Office_id) {
                if (data.From_Type_id == 2) if (p1.isStore == 1) return true;
                if (data.From_Type_id == 3) if (p1.isStore == 2) return true;
                if (data.From_Type_id == 4) if (p1.isStore == 3) return true;
                if (data.From_Type_id == 5) if (p1.isStore == 4) return true;
                if (data.From_Type_id == 6) if (p1.isStore == 5) return true;
                if (data.From_Type_id == 7) if (p1.isStore == 6) return true;
                if (data.From_Type_id == 8) if (p1.isStore == 7) return true;
              }

              return false;
            });
          });
        },
      }),
      From_Type_id: new FormElement({
        label: "Từ đối tượng",
        model: "From_Type_id",
        type: FormElementType.select,
        options: Para.TransferType,
        disabled: true,
      }),
      To_Holder_Id: new FormElement({
        label: "Đến vị trí",
        model: "To_Holder_Id",
        type: FormElementType.select,
        // labelWidth: 140,
        options: Para.Para_Account,
        watch(data, nv, ov, t, isFirst) {
          if (!isFirst && data.To_Type_id == 1) {
            let entry = t.getEntry(data._formElements.To_Holder_Id.id);
            if (entry) {
              let sltd = entry.selectedData || {};
              data.To_Holder_Name = sltd.FullName;
              console.log(data.To_Holder_Name);
            }
          }
        },
        isVisible(data) {
          if (data.To_Type_id == 1) return true;

          return false;
        },
      }),
      To_Holder_Id_2: new FormElement({
        label: "Đến vị trí",
        model: "To_Holder_Id",
        type: FormElementType.select,
        // labelWidth: 140,

        options(data) {
          console.log(data);
          return Para.store_Get_List.set((p) => {
            p.data = p.data.filter((p1) => {
              if (data.Office_id == p1.Office_id) {
                if (data.To_Type_id == 2) if (p1.isStore == 1) return true;
                if (data.To_Type_id == 3) if (p1.isStore == 2) return true;
                if (data.To_Type_id == 4) if (p1.isStore == 3) return true;
                if (data.To_Type_id == 5) if (p1.isStore == 4) return true;
                if (data.To_Type_id == 6) if (p1.isStore == 5) return true;
                if (data.To_Type_id == 7) if (p1.isStore == 6) return true;
                if (data.To_Type_id == 8) if (p1.isStore == 7) return true;
              }

              return false;
            });
          });
        },
        watch(data, nv, ov, t, isFirst) {
          if (!isFirst && (data.To_Type_id == 2 || data.To_Type_id == 3)) {
            let entry = t.getEntry(data._formElements.To_Holder_Id_2.id);
            if (entry) {
              let sltd = entry.selectedData || {};
              data.To_Holder_Name = sltd.Name;
              // console.log(data.To_Holder_Name);
            }
          }
        },
        // isVisible(data) {
        //   if (data.To_Type_id == 2 || data.To_Type_id == 3) return true;

        //   return false;
        // },
      }),
      To_Holder_Name: new FormElement({
        label: "Đến vị trí",
        model: "To_Holder_Name",
        type: FormElementType.text,
        disabled: true,
        // labelWidth: 140,

        isVisible(data) {
          if (
            data.To_Type_id != 2 &&
            data.To_Type_id != 1 &&
            data.To_Type_id != 3
          )
            return true;

          return false;
        },
      }),
      To_Type_id: new FormElement({
        label: "Đến đối tượng",
        model: "To_Type_id",
        required: true,
        type: FormElementType.select,
        options: Para.TransferType,
        watch(data, nv, ov, _this, isFirst) {
          if (!isFirst) {
            data.To_Holder_Id = undefined;
            data.To_Holder_Name = "";
          }
        },
      }),
      Fixed_State: new FormElement({
        label: "Fixed_State",
        model: "Fixed_State",
        type: FormElementType.text,
      }),
      Start_Date: new FormElement({
        label: "Ngày chuyển",
        model: "Start_Date",
        type: FormElementType.datePicker,
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.text,
      }),
      Approved_Date: new FormElement({
        label: "Approved_Date",
        model: "Approved_Date",
        type: FormElementType.text,
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

      TransferHistory: new FormElement({
        type: "TransferHistory",
        attr: {
          obj: this,
        },
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 125,
      elements: [
        this._formElements.From_Type_id,
        this._formElements.From_Holder_Name,
        this._formElements.To_Type_id,
        // this._formElements.To_Holder_Id,
        this._formElements.To_Holder_Id_2,
        // this._formElements.To_Holder_Name,
        this._formElements.Start_Date,
        // new FormElement({
        //   direction: FormDirectionType.horizontal,
        //   child:[
        //     new FormElement({
        //   direction: FormDirectionType.vertical,

        //       child:[

        //       ]
        //     }),
        //     this._formElements.TransferHistory,

        //   ]
        // })
      ],
    });
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    };
  }
}
