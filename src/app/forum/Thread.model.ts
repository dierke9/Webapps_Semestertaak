import { User } from "../user/User.model";
import { Post } from "./Post.model";

export class Thread {
    private _id: string;
    private _title: string;
    private _creator: User;
    private _lastPost: User;
    private _lastPostTime: Date;
    private _posts: Post[];

    static fromJSON(json) {
        const creator = User.fromJSON(json.creator);
        const lastPost = User.fromJSON(json.lastPoster);
        const t = new Thread(json.title);
        t.id = json._id;
        t.creator = creator;
        t.lastPost = lastPost;
        t.lastPostTime = json.lastPostTime;
        return t;
    }

    static fromJsonWithPosts(json) {
        const posts = [];
        for (const post of json.posts) {
            const poster = User.fromJSON(post.poster)
            const p = new Post(post.content, poster, post.time);
            p.id = post._id;
            posts.push(p);
        }
        const t = new Thread(json.title);
        t.posts = posts;
        t.id = json._id;
        return t;
    }

    constructor(titel: string) {
        this._title = titel;
    }

    get title() {
        return this._title;
    }
    set title(title: string) {
        this._title = title;
    }

    get creator() {
        return this._creator;
    }
    set creator(creator: User) {
        this._creator = creator;
    }

    get lastPost() {
        return this._lastPost;
    }
    set lastPost(lastPost: User) {
        this._lastPost = lastPost;
    }
    get lastPostTime() {
        return this._lastPostTime;
    }
    set lastPostTime(lastPostTime: Date) {
        this._lastPostTime = lastPostTime;
    }
    get id() {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }

    get posts() {
        return this._posts;
    }
    set posts(posts: Post[]) {
        this._posts = posts;
    }
}
