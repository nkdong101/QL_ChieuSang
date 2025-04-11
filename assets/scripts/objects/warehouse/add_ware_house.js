
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import ware_house from "./ware_house";
import fixed_assets from "../fixed_assets/fixed_assets";

export default class add_ware_house {
  /** @type {ware_house} - description */
  Ware_house = new ware_house();
  /** @type {Array<fixed_assets>} - description */
  Fixed_Assets = [];
  /** @type {string} - description */
  Id;


  /**
   *
   * @param {add_ware_house} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {add_ware_house} obj
   */
  update(obj = {}) {
    this.Ware_house = new ware_house(obj.Ware_house)
    this.Fixed_Assets = (obj.Fixed_Assets || []).map(p => new fixed_assets(p));


    this._formElements = {
      Ware_house: new FormElement({
        label: "Ware_house",
        model: "Ware_house",
        type: FormElementType.text,
      }),
      Fixed_Assets: new FormElement({
        label: "Fixed_Assets",
        model: "Fixed_Assets",
        type: FormElementType.text,
      }),
      Id: new FormElement({
        label: "Id",
        model: "Id",
        type: FormElementType.text,
      }),

    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Ware_house,
        this._formElements.Fixed_Assets,
        this._formElements.Id

      ]
    });
  }
  toJSON() {
    return {
      Ware_house: this.Ware_house.toJSON(),
      Fixed_Assets: this.Fixed_Assets.map(p => p.toJSON()),
      _formElements: undefined
    }
  }

}
