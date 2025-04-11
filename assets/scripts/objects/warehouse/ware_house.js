
import { FormDirectionType, FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../../Para";
import { GetTimeNow } from "../../Functions";

export default class ware_house {
  /** @type {string} - description */
  Code;
  /** @type {number} - description */
  Order_id;
  Order_serial;
  /** @type {string} - description */
  Person;
  /** @type {number} - description */
  Store_id;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  DateActive = GetTimeNow();
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
   * @param {ware_house} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {ware_house} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Code: new FormElement({
        label: "Receipt No.",
        model: "Code",
        type: FormElementType.text,
      }),

      Order_id: new FormElement({
        label: "Order",
        model: "Order_id",
        type: FormElementType.select,
        options: Para.OrderProcess.set(p => p.remoteValue = obj ? [
          {
            Id: obj.Order_id,
            Name: obj.Order_serial
          }
        ] : []),
        disabled(data) {
          if (data.Id)
            return true;
          return false;
        }
      }),
      Person: new FormElement({
        label: "Person",
        model: "Person",
        type: FormElementType.text,
      }),
      DateActive: new FormElement({
        label: "Date Active",
        model: "DateActive",
        type: FormElementType.datePicker,
      }),
      Store_id: new FormElement({
        label: "Store",
        model: "Store_id",
        type: FormElementType.select,
        required: true,
        options: Para.store_Get_List.set(p => p.data = p.data.filter(p => p.isStore == 1))
      }),
      Description: new FormElement({
        label: "Mô tả",
        model: "Description",
        type: FormElementType.text,
        attr: {
          type: 'textarea'
        }
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
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        // new FormElement({
        //   label: 'Receipt Info',
        //   type: FormElementType.label
        // }),

        new FormElement({
          child: [
            this._formElements.Order_id.set(p => p.col = 8),
            this._formElements.Code.set(p => p.col = 5).set(p => p.labelWidth = 90),
            this._formElements.DateActive.set(p => p.col = 5).set(p => p.labelWidth = 90),
            this._formElements.Store_id.set(p => p.col = 6).set(p => p.labelWidth = 80),
          ]
        }),
        this._formElements.Description,

      ]
    });
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }

}
