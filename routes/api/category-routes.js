const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
      // include: [Product, {
      //   model: Tag,
      //   through: ProductTag
      // }]
    });
    // const categoryData = await Category.findAll({
    //   include: [Product]
    // })
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    res.json(category);
  } catch (error) {
    console.log(error);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
  // res.json({ message: `${req.params.catsanddogs} ${req.params.username}` });
});

// I NEED TO DO POST TO CREATE A NEW CATEGORY

router.post("/", async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
