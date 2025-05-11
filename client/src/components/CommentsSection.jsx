import { useState, useEffect } from 'react';
import { useComment } from '../contexts/CommentContext';
import { useAuth } from '../contexts/AuthContext';

const Comments = ({ songId }) => {
  const { comments, fetchComments, addComment, deleteComment } = useComment();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (songId) {
      fetchComments(songId);
    }
  }, [songId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      await addComment(songId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
        <form onSubmit={handleAddComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.user.name}</span>
                {user?._id === comment.user._id && (
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-800">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;