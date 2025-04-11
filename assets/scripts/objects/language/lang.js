import { FormDirectionType, FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../../base/SelectOption";


export default class lang {
    /** @type {Number} - description */
    Type_id;
    /** @type {string} - description */
    Form_id;
    /** @type {string} - description */
    Form_Description;
    /** @type {number} - description */
    Data = [];

    _formElements = {
        Type_id: new FormElement({
            label: "Loại",
            model: "Type_id",
            type: FormElementType.select,
            options() {
                return new SelectOption({
                    data: [{
                        Id: 1, Name: 'Backend',
                    }, {
                        Id: 2, Name: 'Web',
                    }, {
                        Id: 3, Name: 'Mobile',
                    }

                    ]
                })
            }
        }),
        Form_id: new FormElement({
            label: "Tên trang",
            model: "Form_id",
            type: FormElementType.text,
            // options: Para
        }),
        Description: new FormElement({
            label: "Mô tả",
            model: "Description",
            type: FormElementType.text,
        }),
        Form_Description: new FormElement({
            label: "Mô tả",
            model: "Form_Description",
            type: FormElementType.text,
            attr: {
                type: 'textarea',

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
                new FormElement({
                    direction: FormDirectionType.vertical,
                    child: [
                        this._formElements.Type_id,
                        this._formElements.Form_id,
                        this._formElements.Form_Description,
                        new FormElement({
                            type: "LangValue",
                            attr: {
                                data: this,
                            }
                        })
                    ]
                })




            ]
        });
    }
}
