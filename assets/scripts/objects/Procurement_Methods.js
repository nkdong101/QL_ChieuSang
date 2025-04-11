import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
export default class Procurement_Methods {
    /** @type {string} - description */
    Name;
    /** @type {number} - description */
    Sequency;
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
        Name: new FormElement({
            label: "Tên",
            model: "Name",
            type: FormElementType.text,
        }),
        Sequency: new FormElement({
            label:  "Trình tự",
            model: "Sequency",
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
     * @param {Procurement_Methods} obj
     */
    constructor(obj) {
        this.update(obj);
    }
    /**
     *
     * @param {Procurement_Methods} obj
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
            elements: [
                this._formElements.Name,
                this._formElements.Sequency,

            ]
        });
    }
}