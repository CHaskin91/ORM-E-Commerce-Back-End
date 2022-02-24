const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find ALL Categories and Associated Products
router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({ include: Product });
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Find ONE Category by 'id' and Associated Products
router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {include: Product});
        if (!categoryData) {
            res.status(404).json({ message: 'No Category by this ID.' });
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a New Category
router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE Category by 'id'
router.put('/:id', async (req, res) => {
    try {
        const categoryData = await Category.update(req.body, {
            where: {
                id: req.params.id
            }});
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a Category by 'id'
router.delete('/:id', async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!categoryData) {
            res.status(404).json({ message: 'no Category found with this ID.'});
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;