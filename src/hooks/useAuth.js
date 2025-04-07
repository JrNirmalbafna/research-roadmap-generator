import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { apiService } from '../services/api.service';

export const useAuth = () => {
  const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const profile = await apiService.getUserProfile();
          setUserProfile(profile);
        } catch (err) {
          setError(err.message);
        }
      }
      setLoading(false);
    };

    loadUserProfile();
  }, [isAuthenticated, user]);

  const handleLogin = async (provider) => {
    try {
      await loginWithRedirect({
        connection: provider,
        appState: {
          returnTo: window.location.pathname
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin
    });
    setUserProfile(null);
  };

  const getToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    isAuthenticated,
    user: userProfile || user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    getToken
  };
}; 