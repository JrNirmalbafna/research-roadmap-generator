import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GithubAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    
    if (code) {
      // Here you would typically exchange the code for tokens with your backend
      // For now, we'll simulate a successful login
      login();
      navigate('/personalize');
    } else {
      navigate('/signin');
    }
  }, [location, navigate, login]);

  return null;
};

export default GithubAuth; 