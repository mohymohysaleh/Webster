const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const verifyRefreshToken = require('../middleware/verifyToken');

// GET comments for a song
router.get('/:songId', verifyRefreshToken, async (req, res) => {
  console.log('🔍 GET /api/comments/:songId hit');
  console.log('Song ID:', req.params.songId);
  console.log('Authenticated user:', req.user);

  try {
    const comments = await Comment.find({ song: req.params.songId })
      .populate('user', 'name');

    console.log('Fetched comments:', comments);
    res.json(comments);
  } catch (err) {
    console.error('❌ Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});
// POST a new comment
router.post('/:songId', verifyRefreshToken, async (req, res) => {
  console.log('👉 POST /api/comments/:songId');
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);
  console.log('Authenticated user (req.user):', req.user);

  try {
    const newComment = await Comment.create({
      text: req.body.text,
      song: req.params.songId,
      user: req.user.id 
    });

    const populatedComment = await newComment.populate('user', 'name');
    res.status(201).json(populatedComment);
  } catch (err) {
    console.error('❌ Error in comment creation:', err);
    res.status(500).json({ error: 'Internal Server Error during comment creation' });
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
