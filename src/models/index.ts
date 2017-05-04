import * as moment from 'moment';

class Model<T> {
    protected _data: T;
    getRawData(): T {
        return this._data;
    }
}
export class MText extends Model<Text> implements IText {
    private _createdAt;
    private _updatedAt;

    constructor(protected _data: Text) {
        super();
        this._createdAt = moment(_data.createdAt);
        this._updatedAt = moment(_data.updatedAt);
    }
    getCreatedAt() {
        return this._createdAt.toLocaleString().slice(0, 10);
    }
    getUpdatedAt() {
        return this._updatedAt.toLocaleString().slice(0, 10);
    }
    getId() {
        return this._data.id;
    }
    getText() {
        return this._data.text;
    }
}