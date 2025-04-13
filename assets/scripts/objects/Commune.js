import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import Location from "./menu/Location";
import { formElements } from "./menu/Menu";
export default class Commune {
  /** @type {string} - description */
  Code;
  Location = new Location();

  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;

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
      label: "Mã xã/phường",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên xã/phường",
      model: "Name",
      type: FormElementType.text,
    }),
    Location_lng: new FormElement({
      label: "Kinh độ",
      model: "Location.Lng",
      type: FormElementType.text,
    }),
    Location_lat: new FormElement({
      label: "Vĩ độ",
      model: "Location.Lat",
      type: FormElementType.text,
    }),
  };

  /**
   *
   * @param {Commune} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Commune} obj
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
        // new FormElement({
        //   child: [this._formElements.Code, this._formElements.Name],
        // }),

        this._formElements.Code,
        this._formElements.Name,
        this._formElements.Description,
        new FormElement({
          child: [
            this._formElements.Location_lat,
            this._formElements.Location_lng,
          ],
        }),
        // this._formElements.Use,
      ],
    });
  }
}
