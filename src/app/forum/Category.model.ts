import { SubCategory } from "./SubCategory.model";

export class Category{
    private _id: string;
    private _title: string;
    private _description: string;
    private _subCats: SubCategory[];

    static fromJSON(json){
        let subCats = [];
        for(var subcat of json.subCats){
            let scat = new SubCategory(subcat.title, subcat.description);
            scat.id = subcat._id;
            subCats.push(scat);
        }
        const cat = new Category(json.title, json.description, subCats);
        cat.id = json._id;
        cat.SubCats = subCats;
        return cat;
    }

    static fromJSONWithSubcats(json){
        let subCats = [];
        for(var subcat of json.subCats){
            subCats.push(SubCategory.fromJSON(subcat));
        }
        const cat = new Category(json.title, json.description, subCats);
        cat.id = json._id;
        return cat;
    }

    constructor(title: string, description: string, subCats: SubCategory[]){
        this._title = title;
        this._description = description;
        this._subCats = subCats;
    }

    get id(){
        return this._id;
    }

    set id(id: string){
        this._id = id;
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
    get SubCats(){
        return this._subCats;
    }

    set SubCats(subcats: SubCategory[]){
        this._subCats = subcats;
    }
}