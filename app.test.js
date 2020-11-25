process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb");

let eclair = {
  name: "eclair",
  price: 1.0,
};

beforeEach(function () {
  items.push({ name: "cupcake", price: 5.0 });
  items.push({ name: "icecream", price: 3.0 });
});

afterEach(function () {
  while (items.length != 0) items.pop();
});

describe("GET /items", function () {
  test("Get all items", async function () {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items });
  });
});

describe("POST /items", function () {
  test("Adds a new item", async function () {
    const resp = await request(app).post("/items").send(eclair);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.added.name).toEqual("eclair");
    expect(resp.body.added.price).toEqual(1.0);
    expect(items.length).toEqual(3)
  });
});

describe("GET /items:name", function () {
  test("Get single item", async function () {
    const resp = await request(app).get("/items/cupcake");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: { name: "cupcake", price: 5.0 } });
  });
});

describe("PATCH /items:name", function () {
  test("Patch single item", async function () {
    const resp = await request(app)
      .patch("/items/cupcake")
      .send({ name: "mini cupcakes", price: 3.0 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: { name: "mini cupcakes", price: 3.0 },
    });
  });
});

describe("DELETE /items:name", function () {
  test("Delete single item", async function () {
    const resp = await request(app).delete("/items/cupcake");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({message: "Deleted"});
    expect(items.length).toEqual(1);
    expect(items[0].name).toEqual("icecream")
  });
});

