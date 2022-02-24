const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find ALL Categories and Associated Products
router.get('/', async (req, res) => {

});

// Find ONE Category by 'id' and Associated Products
router.get('/:id', async (req, res) => {

});

// CREATE a New Category
router.post('/', async (req, res) => {

});

// UPDATE Category by 'id'
router.put('/:id', async (req, res) => {

});

// DELETE a Category by 'id'
router.delete('/:id', async (req, res) => {

});

module.exports = router;