// Import Models
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Defines a Category association starting with a Product
Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Defines a Category having many products to create multiple foreign keys in the 'Product' table
Category.hasMany(Product, {
    foreignKey: 'category_id',
});

// Product is associated with many Tags
Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id',
});

// Tags associated with many Products
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
});

// Package the four models and export them as an object
module.exports = {
    Category,
    Product,
    Tag,
    ProductTag,
};