import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import Address from "./menu/Location";
export default class Routes {
  /** @type {string} - description */
  Code;
  Name;
  Distance;
  /** @type {string} - description */
  From_Point = new Address();
  /** @type {string} - description */
  To_Point = new Address();
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  Communes;

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
      },
    }),
    Code: new FormElement({
      label: "Mã tuyến đường",
      model: "Code",
      type: FormElementType.text,
    }),
    Communes: new FormElement({
      label: "Xã đi qua",
      model: "Communes",
      type: FormElementType.select,
      options: Para.dm_Commune.set((p) => (p.multiple = true)),
    }),
    Name: new FormElement({
      label: "Tên tuyến đường",
      model: "Name",
      type: FormElementType.text,
    }),

    Distance: new FormElement({
      label: "Khoảng cách",
      model: "Distance",
      type: FormElementType.number,
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
   * @param {Routes} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Routes} obj
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
        this._formElements.Code,
        this._formElements.Name,
        this._formElements.Communes,
        this._formElements.Distance,

        this._formElements.Description,

        new FormElement({
          type: "FromToLocation",
          attr: {
            p_Obj: this,
          },
        }),

        // this._formElements.Use,
      ],
    });
  }
}
