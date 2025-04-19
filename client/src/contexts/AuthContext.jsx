import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/me', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return data.user;
      }
      return null;
    } catch (error) {
      console.error('Auth check failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        credentials: 'include'
      });
      const data = await response.json();
      window.location.href = data.login_url;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 