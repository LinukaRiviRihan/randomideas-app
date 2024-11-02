const express = require('express');
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: 'Build a todo app',
    tag: 'react',
    username: 'john',
    date: '2021-05-12',
  },
  {
    id: 2,
    text: 'Build a weather app',
    tag: 'node',
    username: 'jane',
    date: '2021-05-13',
  },
  {
    id: 3,
    text: 'Build a chat app',
    tag: 'react',
    username: 'john',
    date: '2021-05-14',
  },
];

// get all ideas
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas });
});

// get single idea
router.get('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  res.json({ success: true, data: idea });
});

// add an idea
router.post('/', (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);

  res.json({ success: true, data: idea });
});

// update an idea
router.put('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;

  res.json({ success: true, data: idea });
});

// delete an idea
router.delete('/:id', (req, res) => {
  const index = ideas.findIndex((idea) => idea.id === +req.params.id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  ideas.splice(index, 1);

  res.json({ success: true, data: {} });
});

module.exports = router;