import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('No code provided');
        }

        const serverUrl = 'https://webster-production.up.railway.app';
        /*import.meta.env.VITE_API_URL || 'http://localhost:8000'*/;
        const response = await fetch(`${serverUrl}/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ code })
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        setUser(data.user);
        navigate('/');
      } catch (error) {
        console.error('Callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, location, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-black">
      <div className="text-white text-xl">
        Completing login...
      </div>
    </div>
  );
};

export default GoogleCallback; 