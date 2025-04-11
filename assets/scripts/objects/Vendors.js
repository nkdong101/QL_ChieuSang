import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
export default class Vendors {
    /** @type {string} - description */
    OverallScore;
    /** @type {string} - description */
    Serial;
    /** @type {number} - description */
    Sequency;
    /** @type {number} - description */
    Use;
    /** @type {string} - description */
    Name;
    /** @type {string} - description */
    ContactName;
    /** @type {string} - description */
    ContactPhone;
    /** @type {string} - description */
    ContactEmail;
    /** @type {string} - description */
    TechnicalEvaluation;
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
        OverallScore: new FormElement({
            label: "Overall Score",
            model: "OverallScore",
            type: FormElementType.text,
        }),
        Serial: new FormElement({
            label: "Số Serial",
            model: "Serial",
            type: FormElementType.text,
        }),
        Sequency: new FormElement({
            label:  "Trình tự",
            model: "Sequency",
            type: FormElementType.text,
        }),
        Use: new FormElement({
            label: "Trạng thái",
            model: "Use",
            type: FormElementType.select,
            options: Para.Para_Active,
        }),
        Name: new FormElement({
            label: "Tên",
            model: "Name",
            type: FormElementType.text,
        }),
        ContactName: new FormElement({
            label: "Contact Name",
            model: "ContactName",
            type: FormElementType.text,
        }),
        ContactPhone: new FormElement({
            label: "Contact Phone",
            model: "ContactPhone",
            type: FormElementType.text,
        }),
        ContactEmail: new FormElement({
            label: "Contact Email",
            model: "ContactEmail",
            type: FormElementType.text,
        }),
        TechnicalEvaluation: new FormElement({
            label: "Technical Evaluation",
            model: "TechnicalEvaluation",
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

    };

    /**
     *
     * @param {Vendors} obj
     */
    constructor(obj) {
        this.update(obj);
    }
    /**
     *
     * @param {Vendors} obj
     */
    update(obj) {
        Object.assign(this, obj);
    }
    toJSON() {
        return {
            ...this,
            _formElements: undefined,
        }
    }
    form() {
        return new FormInfo({
            formData: this,
            labelWidth: 180,
            elements: [
                this._formElements.Sequency,
                this._formElements.Serial,
                this._formElements.Name,
                this._formElements.OverallScore,
                // this._formElements.Money,
                // this._formElements.Total,
                this._formElements.ContactName,
                this._formElements.ContactPhone,
                this._formElements.ContactEmail,
                this._formElements.TechnicalEvaluation,
                this._formElements.Use,

            ]
        });
    }
}