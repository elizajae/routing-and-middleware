const router = require("express").Router();
const express = require("express");
const items = require("./fakeDb");
const ExpressError = require("./expressError");

router.use(express.json());


router.get("/", (req, res) => {
    res.json({items: items})
})

router.post("/", (req, res) => {
    const { name, price } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: "Missing name or price" });
    }
    let newItem = { name, price };
    items.push(newItem);
    res.status(201).json({ added: newItem });
})

router.get("/:name", (req, res) => {
    const item = items.find(item => item.name === req.params.name);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
})

router.patch("/:name", (req, res) => {
    let item = items.find(item => item.name === req.params.name);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    if (req.body.name) item.name = req.body.name;
    if (req.body.price !== undefined) item.price = req.body.price;
    res.json({ updated: item });
})

router.delete("/:name", (req, res) => {
    let index = items.findIndex(item => item.name === req.params.name);
    if (index === -1) {
        return res.status(404).json({ error: "Item not found" });
    }
    items.splice(index, 1);
    res.json({ message: "Deleted" });
})

module.exports = router;