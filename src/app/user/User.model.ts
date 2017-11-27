export class User{
    private _username: string;
    private _bio: string;

    constructor(username: string, bio: string){
        this._bio = bio;
        this._username = username;
    }

    static fromJSON(json){
        return new User(json.username, json.bio);
    }

    get bio(){
        return this._bio;
    }

    set bio(bio : string){
        this._bio = bio;
    }
    get username(){
        return this._username;
    }
    
}