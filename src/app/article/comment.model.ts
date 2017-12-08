import { User } from '../user/User.model';

export class Comment {
    private _content: string;
    private _user: User;

    static fromJSON(json) {
        const user = User.fromJSON(json.poster);
        return new Comment(json.text, user);
    }

    constructor(content: string, user: User) {
        this._content = content;
        this._user = user;
    }

    get content() {
        return this._content;
    }

    get user() {
        return this._user;
    }

    set content(content: string) {
        this._content = content;
    }

    set user(user: User) {
        this._user = user;
    }
}
