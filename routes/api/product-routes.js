const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products
 // find all products
// be sure to include its associated Category and Tag data
  router.get('/', async (req, res) => {
  try { 
   const productData = await Product.findAll({ include: ({ model: Category }, {model: Tag}) });
   res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
}); 

// GET one product
// find a single product by its `id`
  // be sure to include its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try { 
    const productData = await Product.findByPk(req.params.id, { include: ({ model: Category }, {model: Tag }) });
    if (!productData) {
    res.status(404).json({ message: "No product with this id"})
    return;
    }
    res.status(200).json(productData);
   } catch (err) {
     res.status(500).json(err);
   }
});

// CREATE new product
router.post('/', async (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which product tags to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE one product by its ID
router.delete('/:id', async (req, res) => {
    try {
        const productData = await Product.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!productData) {
            res.status(404).json({ message: 'No Product found with this ID.'});
            return;
        }

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;