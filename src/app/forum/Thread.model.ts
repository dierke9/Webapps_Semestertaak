import { User } from "../user/User.model";

export class Thread{
    private _id: string;
    private _title: string;
    private _creator: User;
    private _lastPost: User;
    private _lastPostTime: Date;

    static fromJSON(json){
        const creator = User.fromJSON(json.creator);
        const lastPost = User.fromJSON(json.lastPoster);
        return new Thread(json.title, creator, lastPost, json.lastPostTime);
    }

    constructor(titel: string,  creater: User, lastPost: User, lastPostTime: Date){
        this._title = titel;
        this._creator = creater;
        this._lastPost = lastPost;
        this._lastPostTime = lastPostTime;
    }

    get title(){
        return this._title;
    }
    set title(title:string){
        this._title = title;
    }

    get creator(){
        return this._creator;
    }
    set creator(creator:User){
        this._creator = creator;
    }

    get lastPost(){
        return this._lastPost;
    }
    set lastPost(lastPost:User){
        this._lastPost = lastPost;
    }
    get lastPostTime(){
        return this._lastPostTime;
    }
    set lastPostTime(lastPostTime: Date){
        this._lastPostTime= lastPostTime;
    }
    get id(){
        return this._id;
    }
    set id(id: string){
        this._id = id;
    }
}