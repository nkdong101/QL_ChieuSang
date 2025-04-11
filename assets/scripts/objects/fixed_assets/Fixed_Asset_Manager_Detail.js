import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { GetStartMonth, GetTimeNow } from "../../Functions";
import { Para } from "../../Para";
import { SelectOption } from "../../base/SelectOption";
import API from "../../API";

export default class Fixed_Asset_Manager_Detail {
  /** @type {number} - description */
  Fixed_State;
  /** @type {number} - description */
  Fixed_Asset_id;
  /** @type {string} - description */
  Description = "";

  /** @type {string} - description */
  Fixed_Asset_Manager_Id;
  /** @type {string} - description */
  Trasnfer_user;
  /** @type {number} - description */
  Curent_Store_id;
  /** @type {number} - description */
  New_Store_id;
  /** @type {string} - description */
  Curent_Person;
  /** @type {string} - description */
  New_Person;
  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 150,
      elements: [
        this._formElements.Fixed_Asset_id,
        this._formElements.Fixed_State,
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [
            new FormElement({
              direction: FormDirectionType.vertical,
              child: [
                this._formElements.New_Store_id,
                this._formElements.New_Person,
              ],
            }),
            new FormElement({
              direction: FormDirectionType.vertical,
              child: [
                this._formElements.Curent_Store_id,
                this._formElements.Curent_Person,
              ],
            }),
            
          ],
        }),
        this._formElements.Description,
      ],
    });
    // return new FormElement({
    //   direction: FormDirectionType.vertical,
    //   child: [

    // });
  }

  /**
   *
   * @param {Fixed_Asset_Manager_Detail} obj
   */
  constructor(obj) {
    this.update(obj);
    this._formElements = {
      Fixed_State: new FormElement({
        label: "Trạng thái",
        model: "Fixed_State",
        options: Para.fixed_asset_state_Get_List,
        type: "select",
      }),
      Fixed_Asset_id: new FormElement({
        label: "Tài sản",
        model: "Fixed_Asset_id",
        type: "select",
        disabled(data) {
          if (data.Id) return true;
          else false;
        },
        options(data) {
          return new SelectOption({
            data: API.fixed_asset_Get_List,
            params: {
              Office_id: data.From_Office_id,
              Department_id: data.From_Department_id,
            },
            IsItemDisabled: (item) => {
              if (data.table.some((p) => item.Id == p.Fixed_Asset_id))
                return true;
              else return false;
            },
          });
        },
      }),
      Description: new FormElement({
        label: "Mô tả",
        model: "Description",
        attr: {
          type: "textarea",
        },
        type: "text",
      }),
      Curent_Store_id: new FormElement({
        label: "Kho/Phòng giữ hiện tại",
        model: "Curent_Store_id",
        disabled: true,
        type: "select",
        options(data) {
          return Para.store_Get_List.set(
            (p) =>
              (p.data = p.data.filter((p1) => {
                if (data.From_Office_id == p1.Office_id) return true;
              }))
          );
        },
        labelWidth: 180,
      }),
      Curent_Person: new FormElement({
        label: "Người đang sử dụng",
        model: "Curent_Person",
        disabled: true,
        labelWidth: 180,
        type: "select",
        options(data) {
          // console.log($t);
          // data.Person_id = "";
          let dataPara = Para.Para_Account.set((p) => {
            p.data = p.data.filter((p1) => p1.Office_id == data.From_Office_id);
          });
          // console.log(dataPara.data);
          return dataPara;
        },
      }),
      New_Store_id: new FormElement({
        label: "Kho/Phòng mới",
        model: "New_Store_id",
        type: "select",
        options(data) {
          return Para.store_Get_List.set(
            (p) =>
              (p.data = p.data.filter((p1) => {
                if (data.To_Office_id == p1.Office_id) return true;
              }))
          );
        },
        // type: "text",
      }),
      New_Person: new FormElement({
        label: "Người sử dụng mới",
        model: "New_Person",

        type: "select",
        options(data) {
          // console.log($t);
          // data.Person_id = "";
          let dataPara = Para.Para_Account.set((p) => {
            p.data = p.data.filter((p1) => p1.Office_id == data.To_Office_id);
          });
          // console.log(dataPara.data);
          return dataPara;
        },
      }),
    };
  }
  /**
   *
   * @param {Fixed_Asset_Manager_Detail} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }

  toJSON() {
    return {
      ...this,
      _formElements: undefined,
      table: undefined,
      From_Department_id: undefined,
      From_Office_id: undefined,
    };
  }
}
