export class User{
    private _username: string;
    private _email: string;
    private _password: string;
    constructor(username: string, email: string, password: string){
        this._username = username;
        this._email = email;
        this._password = password;
    }
}