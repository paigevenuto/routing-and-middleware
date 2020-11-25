const express = require("express");
const router = express.Router();
const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this);
  }
}

router.get("", function (req, res, next) {
  try {
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

router.post("", function (req, res, next) {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({ added: newItem });
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", function (req, res, next) {
  try {
    let item = items.find((x) => x.name == req.params.name);
    return res.json({ item });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    let item = items.findIndex((x) => x.name == req.params.name);
    items.splice(item, 1);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:name", function (req, res, next) {
  try {
    let item = items.findIndex((x) => x.name == req.params.name);
    items[item].name = req.body.name;
    items[item].price = req.body.price;
    return res.json({ updated: items[item] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
