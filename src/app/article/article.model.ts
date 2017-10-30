export class article{
    private _title : string;
    private _description : string;
    private _imageStirng : string;

    get Title(): string{
        return this._title;
    }
    set Title(title : string){
        this._title = title;
    }

    get Description():string{
        return this._description;
    }

    set Description(desc : string){
        this._description = desc;
    }
}