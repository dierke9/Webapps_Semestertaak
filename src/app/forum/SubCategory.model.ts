export class SubCategory{
    private _id: string;
    private _title: string;
    private _description: string;

    constructor(title: string, description: string){
        this._title = title;
        this._description = description;
    }
    get Title(){
        return this._title;
    }

    set Title(title: string){
        this._title = title;
    }
    get Description(){
        return this._description;
    }

    set Description(description: string){
        this._description = description;
    }
    
    get id(){
        return this._id;
    }

    set id(id: string){
        this._id = id;
    }
}