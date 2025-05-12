import { useEffect, useState } from 'react';
import './AddToCommentModal.css';
import axios from 'axios';

export function AddToCommentModal({ isOpen, onClose, onSubmit, song, songId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch existing comments when modal opens
  useEffect(() => { 
    const fetchComments = async () => {
      if (!songId) return;
      try {
        const response = await axios.get(`https://webster-production.up.railway.app/api/comments/${songId}`, {
          withCredentials: true, 
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (isOpen) fetchComments();
  }, [isOpen, song]);

  const handleSubmit = async () => {
    if (!comment.trim() || !songId) return;

    try {
      const response = await axios.post(
        `https://webster-production.up.railway.app/api/comments/${songId}`,
        { text: comment },
        {
          withCredentials: true, 
        }
      );

      setComments([response.data, ...comments]);
      setComment('');
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
