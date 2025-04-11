import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
export default class Document_Folder {
    /** @type {string} - description */
    Name;
    /** @type {number} - description */
    Parent_id;
    /** @type {number} - description */
    Use;
    /** @type {number} - description */
    Sequency;
    /** @type {number} - description */
    Id;
    /** @type {number} - description */
    DateUpdate;
    /** @type {number} - description */
    DateCreate;
    /** @type {number} - description */
    UserCreate;
    /** @type {number} - description */
    UserUpdate;



    _formElements = {
        Name: new FormElement({
            label: "Tên",
            model: "Name",
            type: FormElementType.text,
        }),
        Parent_id: new FormElement({
            label: "Parent_id",
            model: "Parent_id",
            type: FormElementType.text,
            disabled: true,
        }),
        Use: new FormElement({
            label: "Trạng thái",
            model: "Use",
            type: FormElementType.select,
            options: Para.Para_Active,
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


    };

    /**
     *
     * @param {Document_Folder} obj
     */
    constructor(obj) {
        this.update(obj);
    }
    /**
     *
     * @param {Document_Folder} obj
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
                this._formElements.Parent_id,
                this._formElements.Name,
                this._formElements.Use,
                this._formElements.Sequency,

            ]
        });
    }
}