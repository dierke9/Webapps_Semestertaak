const Request = require("Request");

describe("server", () => {
    let server;
    let categoryid;    
    beforeAll(() => {
        //server = require("../forumBackend/app")
    })
    describe("POST /API/categories", () => {
        let data = {};
        beforeAll((done) => {
            Request(
                { method: 'POST',
                uri: 'http://localhost:3000/API/categories',
                json: true,
                body: {category: {_title:"title", _description: "description"}}
            },(error, response, body) =>{
                data.status = response.statusCode
                data.body = body;
                done();
            })
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        })
        it("check body", () => {
            expect(data.body.title).toBe("title");
            expect(data.body.subCats.length).toBe(0);
            expect(data.body._id).toBeDefined();
            categoryid = data.body._id;
        })
    })
    describe("POST /API/newSubCat", () => {
        let data = {};
        beforeAll((done) => {
            Request(
                { method: 'POST',
                uri: 'http://localhost:3000/API/newSubCat',
                json: true,
                body: {title:"title", description: "description", categoryid: categoryid}
            },(error, response, body) =>{
                data.status = response.statusCode
                data.body = body;
                done();
            })
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        })
        it("check body", () => {
            expect(data.body.title).toBe("title");
            expect(data.body.threads.length).toBe(0);
            expect(data.body._id).toBeDefined();
        })
    })
    describe("GET /API/categoryDetail", () => {
        let data = {};
        beforeAll((done) => {
            Request(
                { method: 'GET',
                uri: 'http://localhost:3000/API/categoryDetail',
                json: true,
                headers: {"id": categoryid}
            },(error, response, body) =>{
                data.status = response.statusCode
                data.body = body;
                done();
            })
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        })
        it("check body", () => {
            expect(data.body.title).toBe("title");
            expect(data.body.subCats.length).toBe(1);
            expect(data.body._id).toBeDefined();
        })
    })

    
})