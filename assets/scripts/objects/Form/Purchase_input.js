import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import ConvertStr from "../../ConvertStr";
import Purchase_Approval from "./Purchase_Approval";
import Purchase_Detail from "./Purchase_Detail";
import Purchase_info from "./Purchase_info";
export default class Purchase_Input {
  /** @type {Purchase_info} - description */
  Info = new Purchase_info();
  /** @type {Array<Purchase_Detail>} - description */
  Details = [new Purchase_Detail()];
  /** @type {Array<Purchase_Approval>} - description */
  Approval = [];

  Amount;

  /**
   *
   * @param {Purchase_Input} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Purchase_Input} obj
   */
  update(obj) {
    if (obj) {
      if (obj.Info) {
        this.Info.update(obj.Info)
      }
      if (obj.Details) {
        this.Details = obj.Details.map(p => new Purchase_Detail(p));
      }
      if (obj.Approval) {
        this.Approval = obj.Approval.map(p => new Purchase_Approval(p));
      }
    }
  }
  //    this.Money_Total = quantity * unit_cost;
  // this.Money_CHF = this.Money_Total * rate;

  totalAmountCurrency() {
    let total = this.Details.reduce((a, b) => a + b.Money_Total, 0);
    this.Info.Money_Total = total
    // return ConvertStr.ToMoneyStr(total, true)

  }
  totalAmount() {
    let total = this.Details.reduce((a, b) => a + b.Money_CHF, 0);
    this.Amount = total
    this.Info.Money_CHF = total;
    // return ConvertStr.ToMoneyStr(total, true)
  }

  isSelfVoid() {

    if (this.Info.Status == 9) {//Trạng thái PR == VOided
      if (this.Approval && this.Approval.filter(p => p.Type_id == 2 && p.State == 4).length == 0)//Không có người duyệt nào voided => là người tạo Void
        return true;
    }
    return false;
  }

}
