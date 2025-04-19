import { useAuth } from '../contexts/AuthContext';
import websterLogo from '../assets/images/Webster.png';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-page">
      <div className="login-content">
        <img src={websterLogo} alt="Webster Logo" className="logo" />
        <button className="google-btn" onClick={login}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
          Sign in with Google
        </button>
      </div>
      <style jsx>{`
        .login-page {
          height: 100vh;
          width: 100vw;
          background-color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .login-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }
        .logo {
          width: 200px;
          height: auto;
        }
        .google-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .google-btn:hover {
          background: #f5f5f5;
        }
        .google-btn img {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
};

export default Login; 