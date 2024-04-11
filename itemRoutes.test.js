process.env.NODE_ENV = "test";
const request = require('supertest');

const app = require('./app');
const items = require('./fakeDb');

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function () {
    items.push(popsicle);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body).toEqual({ items: [popsicle] });
    });
});

describe("GET /items/:name", () => {
    test("Get an item", async () => {
        const res = await request(app).get(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(popsicle);
    });
    test("Respond with 404 if item not found", async () => {
        const res = await request(app).get(`/items/0`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Item not found" });
    });
});

describe("POST /items", () => {
    test("Create a new item", async () => {
        const res = await request(app)
            .post('/items')
            .send({ name: "chips", price: 1.25 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: { name: "chips", price: 1.25 } });
    });
});

describe("/PATCH /items/:name", () => {
    test("Update an item", async () => {
        const res = await request(app)
            .patch(`/items/${popsicle.name}`)
            .send({ name: "pop-ice", price: 2.00 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "pop-ice", price: 2.00 } });
    });
    test("Respond with 404 if item not found", async () => {
        const res = await request(app)
            .patch(`/items/0`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Item not found" });
    });
});

describe("DELETE /items/:name", () => {
    test("Delete an item", async () => {
        const res = await request(app)
            .delete(`/items/${popsicle.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
    test("Respond with 404 if item not found", async () => {
        const res = await request(app)
            .delete(`/items/0`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Item not found" });
    });
});



