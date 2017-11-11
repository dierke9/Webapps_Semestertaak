export class Article{
    private _title : string;
    private _content : string;
    private _imageStirng : string;

    constructor(title: string, content: string, image: string){
        this._title = title;
        this._content = content;
        this._imageStirng = image;
    }

    get Title(): string{
        return this._title;
    }
    set Title(title : string){
        this._title = title;
    }

    get Content():string{
        return this._content;
    }

    set Content(desc : string){
        this._content = desc;
    }

    get image(): string{
        return this._imageStirng;
    }
}