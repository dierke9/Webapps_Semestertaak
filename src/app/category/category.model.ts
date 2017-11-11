export class Category{
    private _name: string;

    constructor(name: string){
        this._name = name;
    }

    get Name():string{
        return this._name;
    }
}