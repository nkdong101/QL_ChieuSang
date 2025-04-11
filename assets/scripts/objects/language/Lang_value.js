import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";

import { SelectOption } from "../../base/SelectOption";
export default class lang {
    /** @type {Number} - description */
    Id;
    /** @type {number} - description */
    Type_id = 1 ;
    /** @type {string} - description */
    Name;


    _formElements = {
        Name: new FormElement({
            label: "Nội dung",
            model: "Name",
            // required: true,
            type: FormElementType.text,
        }),
        Id: new FormElement({
            label: "Mã nội dung",
            model: "Id",
            // type: FormElementType.text,
            required: true,
        }),
        Type_id: new FormElement({
            label: "Ngôn ngữ",
            model: "Type_id",
            // required: true,
            type: FormElementType.select,
            options() {
                return new SelectOption({
                    data: [{
                        Id: 1, Name: 'Việt Nam',
                    },{
                        Id: 2, Name: 'English',
                    }]
                })
            }
        }),


    };

    /**
     *
     * @param {lang} obj
     */
    constructor(obj) {
        this.update(obj);
    }
    /**
     *
     * @param {lang} obj
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
            labelWidth: 100,
            elements: [
                this._formElements.Id,
                this._formElements.Name,
                this._formElements.Type_id,
                // this._formElements.Description,
                // this._formElements.Office_id,
                // this._formElements.Manager_id,

            ]
        });
    }
}
