import { createContext, useContext, useState, useEffect,useCallback } from 'react';
import { useAuth } from './AuthContext';
const CommentContext = createContext();
export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback (async (songId) => {
    try {
      const response = await fetch(`https://webster-production.up.railway.app/api/comments/${songId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setComments(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
    
  }, []);
   useEffect(() => {
        fetchComments();
        fetchComments();
    },[ fetchComments]);
  

  const addComment = useCallback(async (songId, text) => {
    try {
      const response = await fetch(`https://webster-production.up.railway.app/api/comments/${songId}/add-comment`, {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error('Failed to add comment to song');
      }

      const newComment = await response.json();
      setComments(prev => [...prev, newComment]);
      return newComment;
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  }, []);
  // Removed misplaced onSubmit block as it was not integrated properly

  const deleteComment = async (commentId, songId) => {
    try {
      const response = await fetch(`https://webster-production.up.railway.app/api/comments/${commentId}/delete-comment/${songId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

 if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw error;
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
