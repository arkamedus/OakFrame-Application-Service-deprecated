export class Field {
    _type: string;
    _value: any;

    constructor(type: string, value?: any) {
        this._type = type;
        if (value) {
            this._value = value;
        } else {
            this._value = null;
        }
    }
}