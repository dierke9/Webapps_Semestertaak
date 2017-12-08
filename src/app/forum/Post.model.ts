import { User } from '../user/User.model';

export class Post{
    private _id: string;
    private _poster: User;
    private _time: Date;
    private _content: string;

    static fromJSON(json) {
        const user = User.fromJSON(json.poster);
        return new Post(json.content, user, json.time);
    }

    constructor(content: string, poster: User, time: Date) {
        this._content = content;
        this._poster = poster;
        this._time = time;
    }

    get id(){
        return this._id;
    }
    set id(id: string){
        this._id = id;
    }

    get poster(){
        return this._poster;
    }
    set poster(poster: User){
        this._poster = poster;
    }

    get time(){
        return this._time;
    }
    set time(time: Date){
        this._time = time;
    }

    get content(){
        return this._content;
    }
    set content(content: string){
        this._content = content;
    }
}