const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Find all Tags and include it's product data
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({ include: Product });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Find single Tag by ID.  Include it's product data.
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, { include: Product });
        if (!tagData) {
            res.status(404).json({ message: 'No Tag by this ID.' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new Tag
router.post('/', async (req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE Tag Name by ID
router.put('/:id', async (req, res) => {
    try {
        const tagData = await Tag.update(req.body, {
            where: {
                id: req.params.id
            }});

    res.status(200).json(tagData);
    } catch (err) {
    res.status(500).json(err)
    }
});

// DELETE Tag by ID
router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!tagData) {
            res.status(404).json({ message: 'No Tag found with this ID.'});
            return;
        }

        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;