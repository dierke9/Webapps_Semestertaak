import { User } from '../user/User.model';
import { Comment } from './comment.model';

export class Article {
    private _title: string;
    private _content: string;
    private _imageStirng: string;
    private _user: User;
    private _summary: string;
    private _id: string;
    private _comments: Comment[] = [];

    static fromJSON(json): Article {
        const article = new Article(json.title, json.content, json.image, json.summary);
        const user = User.fromJSON(json.poster);
        article.Poster = user;
        article.id = json._id;
        return article;
    }

    static fromJSONWithComment(json): Article {
        const article = Article.fromJSON(json);
        const comments = [];
        for (const comment of json.comments) {
            comments.push(Comment.fromJSON(comment));
        }
        article.comments = comments;
        return article;
    }

    constructor(title: string, content: string, image: string, summary: string) {
        this._title = title;
        this._content = content;
        this._imageStirng = image;
        this._summary = summary;
    }

    get Title(): string {
        return this._title;
    }
    set Title(title: string) {
        this._title = title;
    }

    get Content(): string {
        return this._content;
    }

    set Content(desc: string) {
        this._content = desc;
    }

    get image(): string {
        return 'data:image/png;base64,' + this._imageStirng;
    }

    get Summary() {
        return this._summary;
    }

    get Poster() {
        return this._user;
    }

    set Poster(poster: User) {
        this._user = poster;
    }

    set id(id: string) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get comments(){
        return this._comments;
    }

    set comments(comments: Comment[]){
        this._comments = comments;
    }
}
