import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('createdBy', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, inStock, rating } =
      req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      inStock,
      rating,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, inStock, rating } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.category = category || product.category;
      product.image = image || product.image;
      product.inStock = inStock !== undefined ? inStock : product.inStock;
      product.rating = rating !== undefined ? rating : product.rating;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    }).populate('createdBy', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
