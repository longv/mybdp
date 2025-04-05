import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET one item
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'Item not found' });
});

// POST create item
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  const savedItem = await newItem.save();
  res.status(201).json(savedItem);
});

// PUT update item
router.put('/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  updatedItem ? res.json(updatedItem) : res.status(404).json({ error: 'Item not found' });
});

// DELETE item
router.delete('/:id', async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  deletedItem ? res.json({ message: 'Item deleted' }) : res.status(404).json({ error: 'Item not found' });
});

export default router;
