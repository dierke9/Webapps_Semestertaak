export class User {
    private _username: string;
    private _bio: string;
    private _location: string;
    private _birthdate: string;

    constructor(username: string, bio: string, location: string, birthdate: string) {
        this._bio = bio;
        this._username = username;
        this._location = location;
        this._birthdate = birthdate;
    }

    static fromJSON(json) {
        return new User(json.username, json.bio, json.location, json.birthdate);
    }

    get bio() {
        return this._bio;
    }

    set bio(bio: string) {
        this._bio = bio;
    }
    get username() {
        return this._username;
    }

    get location() {
        return this._location;
    }

    get birthdate() {
        return this._birthdate;
    }
}
