import { Thread } from "./Thread.model";

export class SubCategory{
    private _id: string;
    private _title: string;
    private _description: string;
    private _threads: Thread[];

    static fromJSON(json){
        console.log(json)
        let threads = [];
        for(var thread of json.threads){
            let newThread = Thread.fromJSON(thread);
            newThread.id = thread._id;
            threads.push(newThread);
        }
        var subcat = new SubCategory(json.title, json.description);
        subcat.threads = threads;
        subcat.id = json._id;
        return subcat;
    }

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
    get threads(){
        return this._threads;
    }
    set threads(threads: Thread[]){
        this._threads = threads;
    }
}