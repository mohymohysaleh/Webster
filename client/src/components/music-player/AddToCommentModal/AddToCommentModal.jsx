import { useEffect, useState } from 'react';
import './AddToCommentModal.css';
import axios from 'axios';

export function AddToCommentModal({ isOpen, onClose, onSubmit, song }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch existing comments when modal opens
  useEffect(() => {
    const fetchComments = async () => {
      if (!song?._id) return;
      try {
        const response = await axios.get(`/api/comments/${song._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (isOpen) fetchComments();
  }, [isOpen, song]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${songId}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      // Add new comment at the top
      setComments([response.data, ...comments]);

      // Clear input and close modal
      setComment('');
      onSubmit && onSubmit(comment);
      onClose();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Comment for "{song?.name}"</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="comments-list">
            {Array.isArray(comments) &&
              comments.map((c) => (
                <div key={c._id} className="comment-item">
                  <strong>{c.user?.name || 'Anonymous'}:</strong> {c.text}
                </div>
              ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="textarea"
          />
        </div>

        <div className="modal-footer">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
