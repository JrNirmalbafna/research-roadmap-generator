import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { authConfig } from '../../config/auth';

const GoogleAuth = ({ onSuccess, onError }) => {
  return (
    <GoogleOAuthProvider clientId={authConfig.google.clientId}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log('Login Success:', credentialResponse);
            onSuccess?.(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
            onError?.();
          }}
          useOneTap
          theme="filled_black"
          text="continue_with"
          shape="rectangular"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth; 