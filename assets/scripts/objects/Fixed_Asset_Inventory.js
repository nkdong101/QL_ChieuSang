
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";

export default class Fixed_Asset_Inventory {
  /** @type {number} - description */
  Fixed_Asset_id;
  /** @type {number} - description */
  Type_id;
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Images;
  /** @type {string} - description */
  ImagePreview;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  Note;
  /** @type {number} - description */
  Fixed_Asset_State;
  /** @type {string} - description */
  User_Use;
  /** @type {string} - description */
  User_Name;
  /** @type {string} - description */
  Approved_User;
  /** @type {string} - description */
  Approved_Name;
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
   * @param {Fixed_Asset_Inventory} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Fixed_Asset_Inventory} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Fixed_Asset_id: new FormElement({
        label: "Fixed_Asset_id",
        model: "Fixed_Asset_id",
        type: FormElementType.text,
      }),
      Type_id: new FormElement({
        label: "Loại",
        model: "Type_id",
        type: FormElementType.select,
        options: Para.InventoryType,
        disabled(data) {
          if (data.State > 0)
            return true
        }
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.select,
        options: Para.InventoryState,
        disabled: true,
        isVisible(data) {
          if (data.Type_id == 2 || data.State)
            return true
        }
      }),
      Images: new FormElement({
        // label: "Images",
        model: "Images",
        type: FormElementType.file,
        options: Para.Inventory_Attachment.set(p => {
          p.onPreview = ({ previewFileIndex, previewFiles, entry }) => {
            this.ImagePreview = previewFiles[previewFileIndex];
          }
        }),
        isVisible(data) {
          if (data.Type_id == 2 && !data.State)
            return true
        },
        disabled(data) {
          if (data.State >= 2)
            return true;
        }
      }),
      Description: new FormElement({
        label: "Mô tả",
        model: "Description",
        type: FormElementType.text,
        attr: {
          type: 'textarea'
        },
        disabled(data) {
          if (data.State > 0)
            return true
        }
      }),
      Note: new FormElement({
        label: "Ghi chú",
        model: "Note",
        type: FormElementType.text,
        attr: {
          type: 'textarea'
        },
        isVisible(data) {
          if (data.State >= 1)
            return true
        },
        disabled(data) {
          if (data.State >= 2)
            return true;
        }
      }),
      Fixed_Asset_State: new FormElement({
        label: "Fixed Asset State",
        model: "Fixed_Asset_State",
        type: FormElementType.select,
        options: Para.fixed_asset_state_Get_List.set(p => p.placeholder = ""),
        required: true,
        isVisible(data) {
          if (data.State >= 2)
            return true
        },
        disabled(data) {
          if (data.State >= 3)
            return true;
        }
      }),
      User_Use: new FormElement({
        label: "User_Use",
        model: "User_Use",
        type: FormElementType.text,
      }),
      User_Name: new FormElement({
        label: "Chủ sở hữu",
        model: "User_Name",
        type: FormElementType.text,
        disabled: true
      }),
      Approved_User: new FormElement({
        label: "Approved_User",
        model: "Approved_User",
        type: FormElementType.text,
      }),
      Approved_Name: new FormElement({
        label: "Approved_Name",
        model: "Approved_Name",
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
      Fixed_Code: new FormElement({
        label: "Mã",
        model: "Fixed_Code",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Producer: new FormElement({
        label: "Nhà sản xuất",
        model: "Fixed_Producer",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Model: new FormElement({
        label: "Chủng loại",
        model: "Fixed_Model",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Serial: new FormElement({
        label: "Số Serial",
        model: "Fixed_Serial",
        type: FormElementType.text,
        disabled: true
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.State,
        this._formElements.User_Name,
        this._formElements.Type_id,
        this._formElements.Description,
        this._formElements.Images,
        this._formElements.Note,
        this._formElements.Fixed_Asset_State,
      ]
    });
  }
  formImage() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Images.set(p => p.isVisible = true),
      ]
    });
  }
  formFA() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Fixed_Code,
        this._formElements.Fixed_Serial,
        this._formElements.Fixed_Model,
        this._formElements.Fixed_Producer,
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
