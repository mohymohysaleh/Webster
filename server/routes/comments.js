const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const verifyRefreshToken = require('../middleware/verifyToken');

// GET comments for a song
router.get('/:songId',  verifyRefreshToken, async (req, res) => {
  try {
    const comments = await Comment.find({ song: req.song.id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST a new comment
router.post('/:songId',verifyRefreshToken, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      song: req.params.songId,
      user: req.user._id
    });
    const populatedComment = await newComment.populate('user', 'name');
    res.status(201).json(populatedComment);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// DELETE a comment
router.delete('/:commentId',verifyRefreshToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
